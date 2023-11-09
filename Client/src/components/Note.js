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
import Multiselect from "multiselect-react-dropdown";
import { Tooltip } from "@mui/material";

function Note(props) {
  const navigate = useNavigate();

  const [remainderCss, setRemainderCss] = useState(
    props.note.remainderSet ? "icon-pad" : ""
  );

  const [selectedlLabels, setSelectedLabels] = useState([...props.note.labels]);

  const [datetime, setDateTime] = useState(
    props.note.remainderSet ? props.note.remainderTime : new Date()
  );

  // *************************************
  //   Remainder Handler
  // *************************************

  const remainderHandler = (noteId) => {
    let setdate = datetime == null ? new Date() : datetime;
    setDateTime(() => setdate);
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
          className="btn"
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
    else
      return (
        <Button
          className="btn"
          color="danger"
          size="sm"
          onClick={() => {
            props.onShow();
          }}
        >
          Close
        </Button>
      );
  };

  const selectHandler = (selectedList, selectedItem) => {
    ApiService.AddNoteLabel(props.note.id, selectedItem.id)
      .then((response) => {
        console.log(response);
        setSelectedLabels(() => [...selectedList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeHandler = (selectedList, removedItem) => {
    ApiService.removeNoteLabel(props.note.id, removedItem.id)
      .then((response) => {
        console.log(response);
        setSelectedLabels(() => [...selectedList]);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="card1" id={props.note.id}>
        <h5>{props.note.title}</h5>
        <p>{props.note.description}</p>
        <span className="label-list d-flex justify-content-center align-items-center ps-1">
          <LabelOutlinedIcon
            className="label-icon"
            onClick={props.onLabelShow}
          />
          <ul className="d-flex ">
            {selectedlLabels &&
              selectedlLabels.map((label) => {
                return <p key={label.id}>{label.name}</p>;
              })}
          </ul>
        </span>

        <div className={`d-flex justify-content-around w-100 `}>
          <Tooltip title="Remainder">
            <AccessAlarmOutlinedIcon
              onClick={props.onShow}
              className={`${remainderCss}`}
            />
          </Tooltip>
          <Tooltip title="Label">
            <LabelOutlinedIcon onClick={props.onLabelShow} />
          </Tooltip>
          <Tooltip title="Archive">
            <ArchiveOutlinedIcon
              onClick={() => archiveHandler(props.note.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditNoteOutlinedIcon
              onClick={(event) => {
                editNoteHandler(event, props.note.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Trash">
            <DeleteForeverOutlinedIcon
              onClick={(event) => trashNoteHandler(event, props.note.id)}
            />
          </Tooltip>
        </div>
      </div>

      {/**************************************
          Remainder drop down
         **************************************/}

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
              className="btn"
              onClick={() => {
                remainderHandler(props.note.id);
              }}
            >
              Set
            </Button>
            {checkRemainder()}
          </div>
        </div>
      )}

      {/**************************************
          Label drop down
         **************************************/}

      {props.isLabelActive && (
        <div className="d-flex gap-2 label-drop-down">
          <Multiselect
            // className="searchWrapper"
            hideSelectedList
            showCheckbox
            options={props.labels}
            displayValue="name"
            selectedValues={selectedlLabels}
            selectionLimit={9}
            onSelect={selectHandler}
            onRemove={removeHandler}
          />
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              props.onLabelShow();
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default Note;
