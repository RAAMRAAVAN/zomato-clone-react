import { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./restaurant.css";
import MenuItem from "./MenuItem";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'

const RestaurantPage = () => {
  let [tab, setTab] = useState(1);
  let defaultValue = {
    aggregate_rating: 0,
    city: "",
    city_id: -1,
    contact_number: "",
    cuisine: [],
    cuisine_id: [],
    image: "",
    locality: "",
    location_id: -1,
    mealtype_id: -1,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "",
  };
  let [restaurant, setRestaurant] = useState({ ...defaultValue });
  let [menuitems, setMenuItems] = useState([]);
  let { restaurant_ID } = useParams();
  let [subtotal, setSubtotal] = useState(0);
  let [contactNumber, setContactNumber] = useState(0);

  let getTokenDetails = () => {
    let token = localStorage.getItem("user");
    if (token === null) {
      return false;
    } else {
      return jwt_decode(token);
    }
  };
  const [userLogin, setUserLogin] = useState(getTokenDetails);

  let updateMenuItems = (_menuitems) => {
    setMenuItems(_menuitems);
    console.log("updated", _menuitems);
  };
  let updateSubtotal = (newValue) => {
    setSubtotal(subtotal + newValue);
  };
  let getRestaurantDetails = async () => {
    try {
      let URL =
        "http://127.0.0.1:5000/api/get-restaurant-details-by-id/" +
        restaurant_ID;
      let { data } = await axios.get(URL);
      console.log(data);
      if (data.status === true) {
        setRestaurant({ ...data.result });
      } else {
        setRestaurant({ ...defaultValue });
      }
    } catch (error) {
      alert("server error");
    }
  };
  let getMenuItems = async () => {
    setSubtotal(0);
    try {
      let URL =
        "http://localhost:5000/api/get-menu-item-list-by-restaurent-id/" +
        restaurant_ID;
      let { data } = await axios.get(URL);
      console.log(data);
      if (data.status === true) {
        console.log("menues items", data.result);
        setMenuItems([...data.result]);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      alert("server error");
    }
  };
  useEffect(() => {
    getRestaurantDetails();
  }, []);

  async function loadScript() {
    let src = "https://checkout.razorpay.com/v1/checkout.js";
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      return true;
    };
    script.onerror = () => {
      return false;
    };
    window.document.body.appendChild(script);
  }

  let DisplayRazorpay = async () => {
    let isLoaded = await loadScript();
    if (isLoaded === false) {
      alert("SDK is not loaded");
      return false;
    }
    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/payment/gen-order", {amount: subtotal*100}
      );
      console.log("pay", data);
      var order = data.order;
    } catch (error) {
      alert("server error");
    }

    // return(false)
    let options = {
      key: "rzp_test_xgYaVwXZeBYCul", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato Payment",
      description: "Buying a product from zomato",
      image:
        "https://tradebrains.in/wp-content/uploads/2021/05/Zomato-Logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        let paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        let { data } = await axios.post(
          "http://localhost:5000/api/payment/verify",
          paymentData
        );
        console.log("payment status=", data.status);
        if (data.status === true) {
          Swal.fire({
            icon: 'success',
            title: 'your order has been places! Click here to continue shopping',
            // text: 'Payment failed, please try again',
            // footer: '<a href="">Why do I have this issue?</a>'
          }).then(()=>{
            window.location.replace("/");
          })
          // alert("order placed successfully");
          // window.location.replace("/");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Payment failed, please try again',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          // alert("Payment failed, please try again");
        }
      },
      prefill: {
        name: userLogin.name,
        email: userLogin.email,
        contact: Number(contactNumber),
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    let razorpayObject = new window.Razorpay(options);
    razorpayObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razorpayObject.open();
  };

  return (
    <div className="container-fluid">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalToggleLabel">
                {restaurant.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {menuitems.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      key={index}
                      index={index}
                      item={item}
                      updateSubtotal={updateSubtotal}
                      updateMenuItems={updateMenuItems}
                      menuitems={menuitems}
                    />
                  </>
                );
              })}
            </div>
            <div className="modal-footer justify-content-between">
              <p className="fw-bold">Subtotal `{subtotal}</p>
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                {restaurant.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={userLogin.name}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email Id"
                  value={userLogin.email}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Contact Number"
                  value={contactNumber}
                  onChange={(e)=>{setContactNumber(e.target.value)}}
                />
              </div>
              <div className="">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  placeholder="Enter your address"
                  id="floatingTextarea"
                  rows="5"
                  value="@Guwahati"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                GO BACK
              </button>
              <button className="btn btn-success" onClick={DisplayRazorpay}>
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </div>
      <Header />
      <section className="row justify-content-center">
        <section className="col-11 mt-2 restaurant-main-image position-relative">
          <img src={restaurant.image} alt="" />
          <button className="btn-gallery position-absolute btn">
            Click to see Image Gallery
          </button>
        </section>
        <section className="col-11 mt-3">
          <h3>{restaurant.name}</h3>
          <div className="d-flex justify-content-between align-items-start">
            <ul className="list-unstyled d-flex gap-3 fw-bold">
              <li
                className="pb-2 hand"
                onClick={() => {
                  setTab(1);
                }}
              >
                Overview
              </li>
              <li
                className="pb-2 hand"
                onClick={() => {
                  setTab(2);
                }}
              >
                Contact
              </li>
            </ul>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              href="#exampleModalToggle"
              role="button"
              onClick={() => getMenuItems()}
              disabled={userLogin ? false : true}
            >
              Place Online Order
            </button>
          </div>
          {tab === 1 ? (
            <section>
              <h4 className="mb-3">About this place</h4>
              <p className="m-0 fw-bold">Cuisine</p>
              <p className="mb-3 text-muted small">
                {restaurant.cuisine.length > 0
                  ? restaurant.cuisine.reduce((pVal, cVal) => {
                      return pVal.name + ", " + cVal.name;
                    })
                  : null}
              </p>

              <p className="m-0 fw-bold">Average Cost</p>
              <p className="mb-3 text-muted small">
                ₹{restaurant.min_price} for two people (approx.)
              </p>
            </section>
          ) : (
            <section>
              <h4 className="mb-3">Contact</h4>
              <p className="m-0 fw-bold">Phone Number</p>
              <p className="mb-3 text-danger small">
                +{restaurant.contact_number}
              </p>

              <p className="m-0 fw-bold">{restaurant.name}</p>
              <p className="mb-3 text-muted small">
                {restaurant.locality}, {restaurant.city}
              </p>
            </section>
          )}
        </section>
      </section>
    </div>
  );
};
export default RestaurantPage;
