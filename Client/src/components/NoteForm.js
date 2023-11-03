import React, { Fragment, useState } from "react";
import ApiService from "../Services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../Style/noteForm.css";

function NoteForm({ data }) {
  const [formData, setFormData] = useState({
    title: data != null ? data.title : "",
    description: data != null ? data.description : "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // validating the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "title is required";

    if (!formData.description.trim())
      newErrors.description = "description is required";

    if (Object.keys(newErrors).length === 0) {
      if (data != null) {
        ApiService.updateNote("1", data.id, formData).then((response) => {
          console.log(response);
          navigate("/home");
        });
      } else {
        ApiService.addNote("1", formData).then((response) => {
          console.log(response);
          navigate("/home");
        });
      }
    }
    setErrors(newErrors);
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
      <div
        className="back-drop"
        onClick={() => {
          navigate("/home");
        }}
      ></div>
      <div className="d-flex justify-content-center text-center note-form-container">
        {console.log("notes form" + data)};
        <form onSubmit={handleSubmit} className="note-form">
          <h4 className="mb-4">Note</h4>
          <div>
            <label>Title:</label>
            <input
              className="rounded border-0 p-1"
              name="title"
              type="text"
              value={formData.title}
              onChange={inputChangeHandler}
              placeholder="Title"
            />
          </div>
          {errors.title && <span>{errors.title}</span>}
          <div>
            <label> Description: </label>
            <input
              className="rounded border-0 p-1"
              name="description"
              type="text"
              value={formData.description}
              onChange={inputChangeHandler}
              placeholder="Description"
            />
          </div>
          {errors.description && <span>{errors.description}</span>}
          <div className="mt-4 d-flex justify-content-around">
            {data != null ? (
              <Button color="success" size="sm" onClick={handleSubmit}>
                Update
              </Button>
            ) : (
              <Button color="success" size="sm" onClick={handleSubmit}>
                Add Note
              </Button>
            )}
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                navigate("/home");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default NoteForm;
