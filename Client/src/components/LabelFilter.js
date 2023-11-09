import React, { useEffect, useState } from "react";
import ApiService from "../Services/ApiService";
import Note from "./Note";
import "../Style/card.css";
import { useParams } from "react-router-dom";
import "../Style/label.css";

function LabelFilter() {
  const [noteList, setNoteList] = useState(null);
  const [labelList, setLabelList] = useState(null);
  const [isCalenderOpen, setCalender] = useState(-1);
  const [isLabelOpen, setLabelOpen] = useState(-1);

  const { id, name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.filterLabelNotes(id);
        console.log("fetching data on render");
        setNoteList(() => response.data);

        const labelResponse = await ApiService.getLabels();

        setLabelList(() => labelResponse.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="hero-main">
      <div className="doodle"></div>
      <div className="container">
        <h4 className="head">{name.toLocaleUpperCase()}</h4>
      </div>
      <div className="d-flex flex-wrap notes">
        {/* {console.log("from")}
          {console.log(typeof noteList)} */}
        {noteList &&
          noteList.map((data) => {
            return (
              <Note
                labels={labelList}
                note={data}
                key={data.id}
                isActive={isCalenderOpen === data.id}
                isLabelActive={isLabelOpen === data.id}
                onShow={() => {
                  isLabelOpen && setLabelOpen((preState) => !preState);
                  setCalender(() =>
                    isCalenderOpen === data.id ? -1 : data.id
                  );
                }}
                onLabelShow={() => {
                  isCalenderOpen && setCalender((preState) => !preState);
                  setLabelOpen(() => (isLabelOpen === data.id ? -1 : data.id));
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default LabelFilter;
