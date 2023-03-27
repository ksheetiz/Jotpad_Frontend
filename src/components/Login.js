import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [otp, setotp] = useState("");
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); //So that page does'nt reload on submit
    //Don't hardcode the url bring it from config file using node or via environment variables
    //TODO Code URL into environment variable
    const response = await fetch(`https://jotpad-backend.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      //redirect
      ref.current.click();
      settoken(json.token);
    } else {
      props.showAlert("Invalid Credentials !!", "danger");
    }
  };

  const checkOtp = () => {
    let substr = token.slice(-4);
    //console.log(substr);
    if (otp === substr) {
      localStorage.setItem("token", token);
      refClose.current.click();
      navigate("/");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials !!", "danger");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onChange1 = (e) => {
    setotp(e.target.value);
  };

  return (
    <>
      <div>
        <h2>Login To Continue !!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enter OTP sent to registered E-Mail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="etitle"
                    value={otp}
                    onChange={onChange1}
                    aria-describedby="emailHelp"
                    maxLength={4}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={checkOtp}
              >
                Validate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
