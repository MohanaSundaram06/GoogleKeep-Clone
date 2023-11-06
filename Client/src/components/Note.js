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
import { Button } from "reactstrap";

function Note(props) {
  const navigate = useNavigate();

  const [remainderCss, setRemainderCss] = useState(
    props.note.remainderSet ? "icon-pad" : ""
  );

  const [datetime, setDateTime] = useState(
    props.note.remainderSet ? props.note.remainderTime : new Date()
  );

  // *************************************
  //   Remainder Handler
  // *************************************

  const remainderHandler = (noteId) => {
    let setdate = datetime == null ? new Date() : datetime;

    const data = setdate.toISOString().split("T")[0];
    const formatedDate = data + "T" + setdate.toLocaleTimeString();

    ApiService.setRemainder(noteId, formatedDate)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setRemainderCss(() => "icon-pad");
    props.onShow();
  };

  const checkRemainder = () => {
    if (props.note.remainderSet || remainderCss.length > 0)
      return (
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            ApiService.deleteRemainder(props.note.id);
            props.note.remainderSet = false;
            setRemainderCss(() => "");
            props.onShow();
          }}
        >
          Delete
        </Button>
      );
  };

  const labelhandler = (event) => {
    console.log(event);
  };

  // *************************************
  //   Archive Handler
  // *************************************
  const archiveHandler = (id) => {
    ApiService.archiveNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  // *************************************
  //   Edit Note Handler
  // *************************************
  const editNoteHandler = (event, id) => {
    console.log("editing");
    navigate(`/edit-note/${id}`);
  };

  // *************************************
  //   Trash Note Handler
  // *************************************
  const trashNoteHandler = (event, id) => {
    ApiService.trashNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  return (
    <div className="card-container">
      <div
        className="card1"
        id={props.note.id}
        onClick={() => props.isActive && props.onShow()}
      >
        <h4>{props.note.title}</h4>
        <p>{props.note.description}</p>
        <span>labels...</span>

        <div className={`d-flex justify-content-around w-100 `}>
          <AccessAlarmOutlinedIcon
            onClick={props.onShow}
            className={`${remainderCss}`}
          />
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
      {props.isActive && (
        <div className="date-card d-flex flex-column gap-5">
          <DateTimePicker
            minDate={new Date()}
            disableClock={true}
            onChange={setDateTime}
            value={datetime}
          />
          <div className="d-flex justify-content-around">
            <Button
              color="success"
              size="sm"
              onClick={() => {
                remainderHandler(props.note.id);
              }}
            >
              Add Remainder
            </Button>
            {checkRemainder()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
