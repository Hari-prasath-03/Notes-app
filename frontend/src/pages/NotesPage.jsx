/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import NotesCard from "../components/NotesCard";
import Controls from "../components/Controls";
import AuthPopup from "../components/AuthPopup";

const NotesPage = () => {
  const { notes, isAuthPopupShown } = useContext(NotesContext);

  return (
    <div className="">
      {notes.map((note) => (
        <NotesCard key={note._id} note={note} />
      ))}
      <Controls />
      {isAuthPopupShown && <AuthPopup />}  
    </div>
  );
};

export default NotesPage;