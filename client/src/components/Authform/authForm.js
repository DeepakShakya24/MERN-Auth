import React, { useState } from "react";
import "./authform.css";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = { name: "", email: "", password: "" };
const AuthForm = () => {
  const [formData, setformData] = useState(initialState);
  const [isSignUp, setisSignUp] = useState(false);
  // const [error, seterror] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setisSignUp((prevSignup) => !prevSignup);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
  const googleFailure = async (err) => {
    console.log(err);
    console.log("Google login is unsuccesfull");
  };
  return (
    <>
      <div class="login-form">
        {state.autherror && (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{state.autherror}</strong>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h2 class="text-center">{isSignUp ? "SignUp" : "SignIn"}</h2>
          {isSignUp ? (
            <>
              <div class="form-group">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <input
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div class="form-group">
                <input
                  type="Email"
                  name="email"
                  class="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              {isSignUp ? "SignUp" : "Signin"}
            </button>
            <GoogleLogin
              clientId="742100414752-6s1qo0572mt7d2oen4ccj9q5dlndi7bk.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  class="btn btn-primary btn-block"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i className="fa fa-google"> Google SignIn</i>
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </form>
        <p class="text-center">
          <p onClick={switchMode} style={{ cursor: "pointer" }}>
            {isSignUp
              ? "Already have an account Signin"
              : "Don't have account SignUp"}
          </p>
        </p>
      </div>
    </>
  );
};

export default AuthForm;
