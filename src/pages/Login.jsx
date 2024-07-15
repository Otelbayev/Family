import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif";
import axios from "axios";
import { useVerification } from "../hooks/useVerification";

const Login = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();
  const [emailStyle, setEmailStyle] = useState({});
  const [pwStyle, setPwStyle] = useState({});
  const [loading, setLoading] = useState(false);

  const verification = useVerification(localStorage.getItem("token"));

  useEffect(() => {
    verification.then((res) => {
      if (res) {
        navigate("/admin/main");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pw = pwRef.current.value;
    !email ? setEmailStyle({ border: "1px solid red" }) : setEmailStyle({});
    !pw ? setPwStyle({ border: "1px solid red" }) : setPwStyle({});
    if (email && pw) {
      try {
        setLoading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}/user/login`,
          {
            login: "family@admin.family",
            password: "family",
          }
        );

        if (res.status === 200) {
          localStorage.setItem("token", res.data?.token);
          navigate("/admin/main");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setEmailStyle({ border: "1px solid red" });
        setPwStyle({ border: "1px solid red" });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-body">
            <p className="login-box-msg">Login to admin panel</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  ref={emailRef}
                  style={emailStyle}
                  onFocus={() => setEmailStyle({})}
                  defaultValue={"family@admin.family"}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  ref={pwRef}
                  style={pwStyle}
                  onFocus={() => setPwStyle({})}
                  defaultValue={"family"}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {loading ? (
                    <button className="btn btn-primary btn-block" disabled>
                      loading
                      <img src={loadingGif} style={{ width: "20px" }} alt="" />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
