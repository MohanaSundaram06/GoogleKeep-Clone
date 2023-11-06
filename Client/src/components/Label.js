import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ApiService from "../Services/ApiService";
import { Button } from "reactstrap";
import "../Style/label.css";

function Label() {
  const [labelList, setLabelList] = useState(null);
  const [name, setName] = useState("");
  const [labId, setLabId] = useState("");
  const [isedit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getLabels();
        console.log(response.data);
        setLabelList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Label name is required";
    console.log(newErrors.name);
    if (Object.keys(newErrors).length === 0) {
      if (isedit) {
        ApiService.updateLabel(labId, name).then((response) => {
          console.log(response);
          window.location.reload();
        });
      } else {
        ApiService.addLabel(name).then((response) => {
          window.location.reload();
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

  const inputChangeHandler = (event) => {
    const { value } = event.target;
    // console.log(event.target.value);
    setErrors({});
    setName(value);
  };

  const deleteHandler = (event, id) => {
    ApiService.deleteLabel(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
      window.location.reload();
    });
  };

  const editLableHandler = (event, labelName, id) => {
    setEdit(() => true);
    setName(() => labelName);
    setLabId(() => id);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <div>
          <input
            name="name"
            type="text"
            value={name}
            onChange={inputChangeHandler}
            placeholder="Title"
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        {isedit ? (
          <Button color="success" size="sm">
            Update Label
          </Button>
        ) : (
          <Button color="success" size="sm">
            Add Label
          </Button>
        )}
        {isedit && (
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              setEdit(() => false);
              setName(() => "");
              setLabId(() => "");
            }}
          >
            Cancel
          </Button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Label</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labelList &&
            labelList.map((data, index) => (
              <tr key={index} id={data.id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>
                  <div>
                    <EditNoteOutlinedIcon
                      onClick={(event) => {
                        editLableHandler(event, data.name, data.id);
                      }}
                    />
                    <DeleteForeverOutlinedIcon
                      onClick={(event) => deleteHandler(event, data.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Label;
