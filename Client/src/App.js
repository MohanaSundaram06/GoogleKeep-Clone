import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import NoteForm from "./components/NoteForm";
import EditNote from "./components/EditNote";
import Trash from "./components/Trash";
import Archived from "./components/Archived";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import "./App.css";
import Label from "./components/Label";
import Remainder from "./components/Remainder";
import LabelFilter from "./components/LabelFilter";
import { useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Notes />} />

          <Route path="/archive" element={<Archived />} />
          <Route path="/remainder" element={<Remainder />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/add-note" element={<NoteForm />} />
          <Route path="/label" element={<Label />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/label/:id/:name" element={<LabelFilter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
