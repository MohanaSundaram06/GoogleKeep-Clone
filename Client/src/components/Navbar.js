import React, { Fragment, useState } from "react";
import "../Style/navBar.css";
import { useNavigate } from "react-router-dom";
import ApiService from "../Services/ApiService";
import Dropdown from "./Dropdown";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

function Navbar() {
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userId");
  const [isdropDownActive, setDropDown] = useState(false);
  const [labelList, setLabelList] = useState(null);

  const fetchData = async () => {
    try {
      const response = await ApiService.getLabels();
      // console.log(response.data);
      setLabelList(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Fragment>
      {userData && (
        <div className="d-flex bg-dark navbar ">
          <h2>Google Keep</h2>
          <div className="d-flex menu">
            <div
              onClick={() => {
                navigate("/home");
              }}
            >
              Notes
            </div>

            <div
              onClick={() => {
                navigate("/remainder");
              }}
            >
              Remainder
            </div>

            <section className=".dropdown-menu ">
              <div
                className="menu-icon"
                onClick={() => {
                  fetchData();
                  setDropDown((prevState) => !prevState);
                }}
              >
                Labels <KeyboardArrowDownOutlinedIcon />
              </div>
              {isdropDownActive && labelList && (
                <menu className="dropdown-items">
                  {labelList.map((labelData) => (
                    <Dropdown
                      key={labelData.id}
                      label={labelData}
                      onShow={() => {
                        setDropDown((prevState) => !prevState);
                      }}
                    />
                  ))}
                </menu>
              )}
            </section>

            <div
              onClick={() => {
                navigate("/label");
              }}
            >
              Edit Labels
            </div>

            <div
              onClick={() => {
                navigate("/archive");
              }}
            >
              Archived
            </div>

            <div
              onClick={() => {
                navigate("/trash");
              }}
            >
              Trash
            </div>
          </div>
          <div className="d-flex user">
            <div>{sessionStorage.getItem("username")}</div>
            <div
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Navbar;
