import React, { Fragment, useState } from "react";
import ApiService from "../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../Style/noteForm.css";

function Login(data) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // validating the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.title = "Email is required";

    if (!formData.password.trim())
      newErrors.description = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      ApiService.login(formData)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("userId", response.data.id);
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("token", response.data.accessToken);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          const newError = {};
          newError.main = error.response.data.message;
          setErrors(newError);
        });
    }
  };

  //  handling the submit action
  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
  };

  //  handling input changes
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Fragment>
      <div className="back-drop-home"></div>

      <div className="d-flex justify-content-center text-center note-form-container">
        <form onSubmit={handleSubmit} className="note-form">
          <h4 className="mb-4">Login</h4>
          {errors.main && <span>{errors.main}</span>}
          <div>
            <label>Email:</label>
            <input
              className="rounded border-0 p-1"
              name="username"
              type="email"
              value={formData.username}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
          </div>
          {errors.title && <span>{errors.title}</span>}
          <div>
            <label> Password:</label>
            <input
              className="rounded border-0 p-1"
              name="password"
              type="password"
              value={formData.password}
              onChange={inputChangeHandler}
              placeholder="password"
            />
          </div>
          {errors.description && <span>{errors.description}</span>}
          <div className="mt-4 d-flex justify-content-around">
            <Button color="success" size="sm" onClick={handleSubmit}>
              Login
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
