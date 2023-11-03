import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import Landing from "./components/Landing";
import NoteForm from "./components/NoteForm";
import EditNote from "./components/EditNote";
import Trash from "./components/Trash";
import Archived from "./components/Archived";
import Navbar from "./components/Navbar";
import PlusButton from "./components/PlusButton";
import Notes from "./components/Notes";
import "./App.css";
import Label from "./components/Label";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setUserData(() => localStorage.getItem("userId"));
    };

    fetchData();
  }, [userData]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Notes />} />

          <Route path="/archive" element={<Archived />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/add-note" element={<NoteForm />} />
          <Route path="/label" element={<Label />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
