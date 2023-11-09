import React, { useEffect, useState } from "react";
import "../Style/card.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ApiService from "../Services/ApiService";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Tooltip } from "@mui/material";

function Trash() {
  const [noteList, setNoteList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getTrashNotes("1");
        console.log(response.data);
        setNoteList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const restoreNoteHandler = (event, id) => {
    ApiService.restoreNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  const trashNoteHandler = (event, id) => {
    ApiService.deleteNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  return (
    <div className="hero-main">
      <div className="doodle"></div>
      <div className="d-flex flex-wrap notes">
        {noteList &&
          noteList.map((data) => {
            return (
              <div className="card1" id={data.id} key={data.id}>
                <h5>{data.title}</h5>
                <p>{data.description}</p>
                <div className="d-flex justify-content-around w-100">
                  <Tooltip title="Restore">
                    <RestoreFromTrashIcon
                      onClick={(event) => {
                        restoreNoteHandler(event, data.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteForeverOutlinedIcon
                      onClick={(event) => trashNoteHandler(event, data.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Trash;
