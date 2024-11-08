import PropTypes from "prop-types";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { updateNote } from "../utils/dbUtils";
import { toast } from "react-toastify";

const Color = ({ color, className }) => {
  const { notes, setNotes, selectedNote } = useContext(NotesContext);

  const changeColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note._id === selectedNote._id
      );

      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes(newNotes);

      updateNote(selectedNote._id, { colors: JSON.stringify(color) });

    } catch (error) {
      toast.warning("Choose a note to change color", {
        autoClose: 3000,
      });
    }
  };
  
  return (
    <div
      className={`bg-gray-400 rounded-full transition-all duration-300 cursor-pointer ${className}`}
      onClick={changeColor}
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

Color.propTypes = {
  color: PropTypes.object,
  className: PropTypes.string,
};

export default Color;
