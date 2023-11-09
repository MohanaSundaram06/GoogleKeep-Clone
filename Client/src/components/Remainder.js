import React, { Fragment, useEffect, useState } from "react";
import ApiService from "../Services/ApiService";
import Note from "./Note";
import "../Style/card.css";

function Remainder() {
  const [noteList, setNoteList] = useState(null);
  const [isCalenderOpen, setCalender] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAllRemainderNotes();
        //   console.log(response.data)
        setNoteList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="hero-main">
      <div className="doodle"></div>
      <div className="d-flex flex-wrap notes">
        {/* {console.log(noteList)} */}
        {noteList &&
          noteList.map((data) => {
            return (
              <Note
                note={data}
                key={data.id}
                isActive={isCalenderOpen === data.id}
                onShow={() =>
                  setCalender(() => (isCalenderOpen === data.id ? -1 : data.id))
                }
              />
            );
          })}
      </div>
    </div>
  );
}

export default Remainder;
