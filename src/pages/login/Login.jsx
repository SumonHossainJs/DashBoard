import "./Login.scss";
import React, { useState, useRef } from "react";
import newRequest from "../../Utils/newRequest.js";
import SlickSlider from "../../Utils/SlickSlider/SlickSlider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/slices/userSlice.js";

const Login = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  const [error, setError] = useState(null);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLoginChange = (e) => {
    setLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const req = await newRequest.post("/auth/signup", {
        ...register,
      });

      navigate("/services");
    } catch (err) {
      console.log(err);
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      console.log(Login);
      const res = await newRequest.post("/auth/login", {
        ...Login,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(res.data);
      navigate("/")
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      dispatch(loginFailure());
    }
  };
  

  const loginPage = () => {
    slider1Ref.current.slickNext();
  };

  const registerPage = () => {
    slider1Ref.current.slickPrev();
  };

  return (
    <div className="login">
      <div className="left">
        <div className="vertical"></div>
        <div className="left-slide">
          <SlickSlider
            slidesToShow={1}
            arrows={false}
            fade={true}
            asNavFor={nav2}
            ref={(slider) => {
              setNav1(slider);
              slider1Ref.current = slider;
            }}
          >
            <div className="slide-box">
              <h1>👋 Welcome back </h1>
              <span>Unlise Your full Potentials</span>
            </div>
            <div className="Slide-two">
              <div className="logo">
                <span>Fiverr2</span>
              </div>
              <h2>Welcome to Fiverr2 Dashboard</h2>
              <div className="vertical"></div>
              <div className="vertical"></div>
            </div>
          </SlickSlider>
        </div>
      </div>
      <div className="right">
        <div className="overlay"></div>
        <div className="slide-Contaienr">
          <SlickSlider
            slidesToShow={1}
            arrows={false}
            dots={false}
            fade={true}
            asNavFor={nav1}
            ref={(slider) => {
              setNav2(slider);
              slider2Ref.current = slider;
            }}
          >
            <div>
              <div className={`field-con ${error && "red"} `}>
                <h2>User verification</h2>
                <p>
                  Enter the Email you used in the signup process and the
                  Verified password.
                </p>
                <div className="alternate">
                  <p>Don't have an accout yet?</p>
                  <span onClick={registerPage}>create an accout</span>
                </div>
                <div className={`error ${error && "show"}`}>
                  {error}
                </div>
                <form onSubmit={loginSubmit}>
                  <div className="input">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="example@email.com"
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="input">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleLoginChange}
                    />
                  </div>

                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
            <div>
              <div className="field-con">
                <h2>New User Registration</h2>
                <p>
                  Enter the Email you used in the signup process and the
                  Verified password.
                </p>
                <div className="alternate">
                  <p>Have an accout already?</p>
                  <span onClick={loginPage}>Signin now</span>
                </div>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="input">
                    <label>User name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={handleRegisterChange}
                      placeholder="Sumon Hossain"
                    />
                  </div>

                  <div className="input">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handleRegisterChange}
                      placeholder="12@gmail.com"
                    />
                  </div>

                  <div className="input">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleRegisterChange}
                      defaultValue={1678}
                    />
                  </div>

                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </SlickSlider>
        </div>
      </div>
    </div>
  );
};

export default Login;
