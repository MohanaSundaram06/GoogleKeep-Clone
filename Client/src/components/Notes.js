import React, { Fragment, useEffect, useState } from "react";
import ApiService from "../Services/ApiService";
import Note from "./Note";
import "../Style/card.css";
import PlusButton from "./PlusButton";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [noteList, setNoteList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getNotes("1");
        //   console.log(response.data)
        setNoteList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="d-flex flex-wrap notes">
        {/* {console.log(noteList)} */}
        {noteList &&
          noteList.map((data) => {
            return <Note note={data} key={data.id} />;
          })}
      </div>
      <PlusButton />
    </Fragment>
  );
}

export default Notes;
