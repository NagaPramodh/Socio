import "./auth.css";
import { useState } from "react";
import axios from "axios";

function Auth() {
  const [signUpUserData, setsignUpUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [signInUserData, setsignInUserData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setsignUpUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleSignUp = async (signUpUserData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signUp",
        signUpUserData
      );
      console.log(response.data);
    } catch (error) {
      alert("All properties required");
      console.log(error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    handleSignUp(signUpUserData);
    // setsignUpUserData((prevUserData) => ({
    //   ...prevUserData,
    //   email: "",
    //   password: "",
    //   userName: "",
    //   phoneNumber: "",
    // }));
  };

  const handleSignIn = async (signInUserData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signIn",
        signInUserData
      );
      console.log(response.data);
    } catch (error) {
      alert("All properties required");
      console.log(error);
    }
  };
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setsignInUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleSignIn(signInUserData);
    // setsignInUserData((prevUserData) => ({
    //   ...prevUserData,
    //   email: "",
    //   password: "",
    // }));
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label for="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-style"
                            placeholder="Email"
                            name="email"
                            value={signInUserData.email}
                            onChange={handleSignInChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            className="form-style"
                            name="password"
                            placeholder="Password"
                            value={signInUserData.password}
                            onChange={handleSignInChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a
                          href="http://localhost:3000/"
                          className="btn mt-4"
                          onClick={handleSignInSubmit}
                        >
                          Login
                        </a>
                        <p className="mb-0 mt-4 text-center">
                          <a href="http://localhost:3000/" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="userName"
                            className="form-style"
                            placeholder="Full Name"
                            value={signUpUserData.userName}
                            onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="tel"
                            name="phoneNumber"
                            className="form-style"
                            placeholder="Phone Number"
                            value={signUpUserData.phoneNumber}
                            onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-phone"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Email"
                            value={signUpUserData.email}
                            onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Password"
                            value={signUpUserData.password}
                            onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a
                          href="http://localhost:3000/"
                          className="btn mt-4"
                          onClick={handleRegisterSubmit}
                        >
                          Register
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
