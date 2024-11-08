import { useContext, useRef } from "react";
import { createNote } from "../utils/dbUtils";
import { NotesContext } from "../context/NotesContext";
import colors from "../assets/colors.json";
import Plus from "../icons/Plus";

const AddButton = () => {
  const { setNotes, user, setIsAuthPopupShown } = useContext(NotesContext);
  const positionRef = useRef(10);

  const addNote = async () => {
    if(user) {
      const newNote = {
        body: " ",
        colors: JSON.stringify(colors[0]),
        position: JSON.stringify({
          x: positionRef.current,
          y: positionRef.current,
        }),
        userId: user,
      };
  
      positionRef.current += 10;
  
      const res = await createNote(newNote);
      setNotes((prev) => [...prev, res]);
    } else {
      setIsAuthPopupShown(true);
    }
  };

  return (
    <div
      className="bg-[#6b6b6b] flex items-center justify-center size-10 rounded-full cursor-pointer transition-all duration-300 origin-center"
      onClick={addNote}
    >
      <Plus />
    </div>
  );
};

export default AddButton;
