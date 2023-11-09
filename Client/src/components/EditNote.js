import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import { useParams } from "react-router-dom";
import ApiService from "../Services/ApiService";

function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getNote("1", id);

        setNote(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return <>{note && <NoteForm data={note} />}</>;
}

export default EditNote;
