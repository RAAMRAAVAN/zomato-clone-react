import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
function Wallpaper() {
  const [locationList, setLocationList] = useState([]);
  let Navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [collapseID, setCollapseID] = useState("");
  let getLocationList = async () => {
    try {
      let result = await axios.get("https://zomato-clone-backend5.onrender.com/api/get-location");
      let data = result.data;
      console.log(data);
      if (data.status === true) {
        setLocationList([...data.result]);
      } else {
        setLocationList([]);
      }
    } catch (error) {}
  };

  let getRestaurantById = async (location_ID) => {
    try {
      let response = await axios.get(
        "https://zomato-clone-backend5.onrender.com/api/get-restaurant-by-location-id/" + location_ID
      );
      let {status, result} = response.data;
      console.log(result);
      if (status === true) {
        console.log("data status", result.length)
        if (result.length > 0) {
          setRestaurantList([...result]);
          setCollapseID("#restaurant-suggestions");
        }
      } else {
        setRestaurantList([]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getLocationList();
  }, []);

  let getRestaurants = (location_ID, ResName, city) => {
    setCollapseID("");
    setLocation(ResName + ", " + city);
    getRestaurantById(location_ID);
    console.log(restaurantList);
  };

  let getTokenDetails = () => {
    let token = localStorage.getItem("user");
    if (token === null) {
      return false;
    } else {
      return jwt_decode(token);
    }
  };
  const [userLogin, setUserLogin] = useState(getTokenDetails);
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    localStorage.setItem("user", token);
    let data = jwt_decode(token);
    console.log("token", data);
    alert("user Loged in successfully");
    // window.location.reload();
    Navigate("/")
  };
  let onError = () => {
    alert("Login Failed");
  };

  let logout = () => {
    localStorage.removeItem("user");
    alert("User Loged out successfully");
    setUserLogin(false);
    // window.location.reload();
    Navigate("/")
  };
  return (
    <GoogleOAuthProvider clientId="474870145945-g63ahuiehm6c8v08kkd8cvfff2s90bd0.apps.googleusercontent.com">
      {/* <!-- ***************************************login popup********************************************* --> */}
      <div
        className="modal fade"
        id="login"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- ********************************** Login Header ******************************************* --> */}
            <div className="modal-header border-0">
              <h5 className="modal-title h2 ms-3" id="staticBackdropLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <!-- ********************************** Login Body ******************************************* --> */}
            <div className="modal-body d-flex flex-column">
              <div className="container d-flex flex-column px-3">
                {/* <button className="btn border">
                    <img src="./images/gmail.png" className="img-fluid mail" alt=""/>
                    Continue with Gmail
                </button> */}
                <GoogleLogin
                  sx={{ display: "flex", with: "100%" }}
                  onSuccess={onSuccess}
                  onError={onError}
                />
                <button className="btn mt-3 mb-5 border">
                  <img
                    src="./images/facebook.png"
                    className="img-fluid mail"
                    alt=""
                  />
                  Continue with Facebook
                </button>
              </div>
            </div>
            {/* <!-- ********************************** Login Footer ******************************************* --> */}
            <div className="modal-footer mx-5">
              <p data-bs-dismiss="modal" className="signupLink">
                <span>Don’t have account?</span>
                <span>Sign UP</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- **************************************sign in popup******************************************** --> */}
      <div
        className="modal fade"
        id="signup"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- ********************************** SignUp Header ******************************************* --> */}
            <div className="modal-header border-0">
              <h5 className="modal-title h2 ms-3" id="staticBackdropLabel">
                Sign Up
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <!-- *********************************** SignUp Body ******************************************** --> */}
            <div className="modal-body d-flex flex-column">
              <div className="container d-flex flex-column px-3">
                <button className="btn border">
                  <img
                    src="./images/gmail.png"
                    className="img-fluid mail"
                    alt=""
                  />
                  Continue with Gmail
                </button>
                <button className="btn mt-3 mb-5 border">
                  <img
                    src="./images/facebook.png"
                    className="img-fluid mail"
                    alt=""
                  />
                  Continue with Facebook
                </button>
              </div>
            </div>
            {/* <!-- *********************************** SignUp Footer ******************************************** --> */}
            <div className="modal-footer mx-5">
              <p data-bs-dismiss="modal" className="signupLink">
                <span>Already have an account? </span>
                <span>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!--************************************** header contents *********************************************--> */}
      <header className="container-fluid background">
        <div className="container-lg header-container">
          {userLogin ? (
            <div className="row cutton-container">
              {/* <!-- ******************************* Login Button *************************************--> */}
              <span className="col-lg-2 col-md-3 col-sm-4 col-6 p-2 create-btn text-light">
                Welcone, {userLogin.given_name}
              </span>
              {/* <!-- ******************************* SignUp Button *************************************--> */}
              <button
                className="col-lg-2 col-md-3 col-sm-4 col-6 btn border create-btn text-light"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="row cutton-container">
              {/* <!-- ******************************* Login Button *************************************--> */}
              <button
                className="col-lg-1 col-md-1 col-sm-2 col-2 btn text-white border-0 me-1 login-btn"
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Login
              </button>
              {/* <!-- ******************************* SignUp Button *************************************--> */}
              <button
                className="col-lg-2 col-md-3 col-sm-4 col-6 btn border create-btn text-light"
                data-bs-toggle="modal"
                data-bs-target="#signup"
              >
                Create an account
              </button>
            </div>
          )}
          {/* <!-- ******************************* Edureka Logo *************************************--> */}
          <div className="d-flex justify-content-center mt-lg-4 mt-2 mt-sm-4 mt-md-4">
            <div className="edureka-logo display-4 fw-bold d-flex">
              zomato
            </div>
          </div>
          {/* <!-- ******************************* Header title *************************************--> */}
          <header-text className="d-flex justify-content-center mt-4">
            <p className="text-white h1 text-center border-1">
              Find the best restaurants, cafés, and bars
            </p>
          </header-text>
          {/* <!-- ***************************** Location and restaurant Search *************************************--> */}
          <div className="row justify-content-center ">
            {/* <!-- ************************************ location *************************************** --> */}
            <div
              className=" col-lg-3 col-md-4 col-sm-10 col-xs-12 col-12 row p-0 m-0  mt-4 position-relative"
              data-bs-toggle="collapse"
              data-bs-target="#guwahati-suggestions"
              aria-controls="collapseExample"
            >
              <div className="col-12 m-0 p-0">
                {/* <!--************************************ location Input *************************************** --> */}
                <input
                  type="text"
                  placeholder="Please type a location"
                  value={location}
                  className="form-control list-group-flush"
                  id="location-input"
                />
                {/* <!--************************************ location Suggestions *************************************** --> */}
                <div
                  className=" bg-white border shadow position-absolute mt-2 guwahati-suggestions p-3 collapse"
                  style={{ zIndex: 3 }}
                  id="guwahati-suggestions"
                >
                  {locationList.map((value) => {
                    return (
                      <p
                        key={value._id}
                        className=" bg-white select-item"
                        onClick={() => {
                          getRestaurants(
                            value.location_id,
                            value.name,
                            value.city
                          );
                        }}
                      >
                        {value.name}, {value.city}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <!-- ************************************ restaurant  *************************************** --> */}
            <div className="col-lg-5 col-md-6 col-sm-10 col-xs-12 col-12 row p-0 m-0 mt-4 position-relative ms-lg-2 ms-md-2 restaurant mb-5">
              <div
                className="col-12 m-0 p-0 "
                data-bs-toggle="collapse"
                data-bs-target={collapseID}
                aria-controls="collapseExample"
              >
                {/* <!-- ************************************ restaurant Input *************************************** --> */}
                <div className="input-group restaurant  p-0 m-0 mb-2">
                  <span className="input-group-text list-group-flush bg-white ">
                    <i
                      className="fa fa-search restaurant-suggestions"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <input
                    type="text"
                    disabled={true}
                    placeholder="Search for restaurants"
                    className="form-control list-group-flush border-0"
                    style={{ zIndex: 2 }}
                    id="restaurant-input"
                  />
                </div>
                {/* <!-- ************************************ restaurant suggestions *************************************** --> */}
                <div
                  className=" bg-white border shadow position-absolute restaurant-suggestions collapse"
                  id="restaurant-suggestions"
                >
                  {/* <!-- ************************************ restaurant suggestion 1 *************************************** --> */}
                  {restaurantList.map((value) => {
                    return (
                      <div
                        key={value._id}
                        className="card row mx-2 m-0 py-2 flex-row align-items-center border-0 border-bottom list-group-flush"
                      >
                        <div className="col-2">
                          <img
                            src={value.image}
                            alt="img"
                            className="search-image"
                          />
                        </div>
                        <div className="col-9 card-body m-0 p-0">
                          <div className="card-title m-0 p-0 suggestion-title">
                            {value.name}
                          </div>
                          <div className="card-text m-0 p-0 suggestion-text">
                            {value.locality}, {value.city}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </GoogleOAuthProvider>
  );
}
export default Wallpaper;
