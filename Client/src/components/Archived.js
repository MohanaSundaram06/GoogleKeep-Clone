import React, { useEffect, useState } from "react";
import "../Style/card.css";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ApiService from "../Services/ApiService";
import { Tooltip } from "@mui/material";

function Archived() {
  const [noteList, setNoteList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getArchivedhNotes("1");
        console.log(response.data);
        setNoteList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const unArchiveHandler = (event, id) => {
    ApiService.unArchiveNote(id).then((response) => {
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
                  <Tooltip title="Unarchive">
                    <UnarchiveIcon
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="UnArchive"
                      data-tooltip-place="bottom"
                      onClick={(event) => {
                        unArchiveHandler(event, data.id);
                      }}
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

export default Archived;
