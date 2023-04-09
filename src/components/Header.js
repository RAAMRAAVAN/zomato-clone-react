import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Header() {
  const MySwal = withReactContent(Swal)
  let Navigate = useNavigate();
  let getHomePage = () => {
    Navigate("/");
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
    // alert("user Loged in successfully");
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'user Loged in successfully',
    }).then(()=>{
      window.location.reload();
    })
  };
  let onError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Login Failed!',
    })
    // alert("Login Failed");
  };
  let logout = () => {
    localStorage.removeItem("user");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure to logout?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Logout Successful!',
        )
        setUserLogin(false);
        Navigate("/")
        // window.location.reload();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
        )
      }
    })
    // alert("User Loged out successfully");
    // setUserLogin(false);
    // window.location.reload();
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
      <header className="row">
        <div className=" col-12 bg-danger ">
          <div className="container d-flex justify-content-between mt-2 py-1 ">
            <p className="text-white text-italic h3" onClick={getHomePage}>
              zomato
            </p>
            {userLogin ? (
              <div>
                {/* <!-- ******************************* Login Button *************************************--> */}
                <span className="btn text-light">
                  Welcone, {userLogin.given_name}
                </span>
                {/* <!-- ******************************* SignUp Button *************************************--> */}
                <button
                  className="btn btn-outline-light"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                {/* <!-- ******************************* Login Button *************************************--> */}
                <button
                  className="btn text-light"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  Login
                </button>
                {/* <!-- ******************************* SignUp Button *************************************--> */}
                <button
                  className="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#signup"
                >
                  Create an account
                </button>
              </div>
            )}
            {/* <div>
            <button className="btn text-light">log in</button>
            <button className="btn btn-outline-light">create an acccout</button>
          </div> */}
          </div>
        </div>
      </header>
    </GoogleOAuthProvider>
  );
}
export default Header;
