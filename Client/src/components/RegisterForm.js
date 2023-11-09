import React, { Fragment, useState } from "react";
import ApiService from "../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../Style/noteForm.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Form Data:", formData);
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim() || formData.firstName.length < 2)
      newErrors.firstName = "Name should contain minimum 2 characters";

    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    const isValidEmail = emailRegex.test(formData.email);
    if (!formData.email.trim() || formData.email.length < 8 || !isValidEmail)
      newErrors.email = "Enter a valid email id";

    if (!formData.password.trim() || formData.password.length < 8)
      newErrors.password = "Password should contain minimum 8 characters";

    if (Object.keys(newErrors).length === 0) {
      ApiService.register(formData)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          newErrors.main = error.response.data.message;
          setErrors((prevData) => {
            return { ...prevData, newErrors };
          });
        });
    }
    setErrors(() => newErrors);
  };

  return (
    <Fragment>
      <div className="back-drop-home"></div>
      <div className="d-flex justify-content-center text-center note-form-container">
        <form onSubmit={handleSubmit} className="note-form">
          <h4 className="mb-4">Register</h4>
          {errors.main && <span>{errors.main}</span>}

          <div>
            <label>First Name:</label>
            <input
              className="rounded border-0 p-1"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          {errors.firstName && <span>{errors.firstName}</span>}
          <div>
            <label>Last Name:</label>
            <input
              className="rounded border-0 p-1"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="rounded border-0 p-1"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <span>{errors.email}</span>}
          <div>
            <label>Password:</label>
            <input
              className="rounded border-0 p-1"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <span>{errors.password}</span>}
          <div>
            Gender:
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />{" "}
              Female
            </label>
          </div>

          <div className="mt-4 d-flex justify-content-around">
            <Button color="success" size="sm" onClick={handleSubmit}>
              Register
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to login
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default RegisterForm;
