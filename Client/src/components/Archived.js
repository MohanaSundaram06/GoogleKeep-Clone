import React, { useEffect, useState } from "react";
import "../Style/card.css";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ApiService from "../Services/ApiService";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const unArchiveHandler = (event, id) => {
    ApiService.unArchiveNote(id).then((response) => {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.remove();
    });
  };

  return (
    <div className="d-flex flex-wrap notes">
      {noteList &&
        noteList.map((data) => {
          return (
            <div className="card1" id={data.id} key={data.id}>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <div className="d-flex justify-content-around w-100">
                <UnarchiveIcon
                  onClick={(event) => {
                    unArchiveHandler(event, data.id);
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Archived;
