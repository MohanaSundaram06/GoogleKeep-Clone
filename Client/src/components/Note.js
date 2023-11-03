import React, { useState } from "react";
import "../Style/card.css";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ApiService from "../Services/ApiService";
import { useNavigate } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";

function Note(props) {
  const navigate = useNavigate();

  const [isCalenderOpen, setCalender] = useState(false);
  const [datetime, setDateTime] = useState(new Date());

  useState();
  const remainderHandler = (event) => {
    setCalender((prevData) => {
      return !prevData;
    });

    console.log(event);
  };

  const labelhandler = (event) => {
    console.log(event);
  };
  const archiveHandler = (id) => {
    ApiService.archiveNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  const editNoteHandler = (event, id) => {
    console.log("editing");
    navigate(`/edit-note/${id}`);
  };

  const trashNoteHandler = (event, id) => {
    ApiService.trashNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };
  return (
    <div className="card1" id={props.note.id}>
      <h3>{props.note.title}</h3>
      <p>{props.note.description}</p>
      <span>labels...</span>
      <div className="d-flex justify-content-around w-100 utility-icons">
        <AccessAlarmOutlinedIcon onClick={remainderHandler} />
        {/* {isCalenderOpen && (
          <DateTimePicker
            className="date-card"
            onChange={setDateTime}
            value={datetime}
          />
        )} */}
        <LabelOutlinedIcon onClick={labelhandler} />
        <ArchiveOutlinedIcon onClick={() => archiveHandler(props.note.id)} />
        <EditNoteOutlinedIcon
          onClick={(event) => {
            editNoteHandler(event, props.note.id);
          }}
        />
        <DeleteForeverOutlinedIcon
          onClick={(event) => trashNoteHandler(event, props.note.id)}
        />
      </div>
    </div>
  );
}

export default Note;
