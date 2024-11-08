/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { NotesContext } from "../context/NotesContext";

import { deleteNote, updateNote } from "../utils/dbUtils";
import { autoGrow, setNewOffset, setZIndex } from "../utils/utils";
import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner";
// import colorsJson from "../assets/colors.json";
// import Color from "./Color";

const NotesCard = ({ note }) => {
  const { setNotes, setSelectedNote } = useContext(NotesContext);

  const [position, setPositon] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const [body, setBody] = useState(note.body);

  const [bodyIsSaving, setBodyIsSaving] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // To optimise the no. of req to the backend
    const timeDeley = setTimeout(() => {
      updateNote(note._id, {
        position: JSON.stringify(position),
        body: body,
      });
    }, 500);

    return () => clearTimeout(timeDeley);
  }, [position, body]);

  const textareaRef = useRef(null);
  const cardRef = useRef(null);

  const mousePosition = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textareaRef.current);
  }, []);

  const handleMouseDown = (e) => {
    setSelectedNote(note);
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseLeave);

    setZIndex(cardRef.current);
  };

  const handleMouseMove = (e) => {
    const mouseMoveDir = {
      x: mousePosition.x - e.clientX,
      y: mousePosition.y - e.clientY,
    };

    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

    setPositon(() => setNewOffset(cardRef.current, mouseMoveDir));
  };

  const handleMouseLeave = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseLeave);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setBodyIsSaving(true);

    typingTimeoutRef.current = setTimeout(() => {
      setBodyIsSaving(false);
    }, 1500);
  };

  return (
    <div
      ref={cardRef}
      className="card absolute w-[95%] sx:w-[400px] rounded shadow-customShadow"
      style={{
        backgroundColor: colors.colorBody,
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div
        className="rounded-[4px_4px_0_0] flex justify-between items-center p-1.5 cursor-grab active:cursor-grabbing"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={handleMouseDown}
      >
        <Trash
          deleteNote={() => {
            deleteNote(note._id, setNotes);
          }}
        />
        {bodyIsSaving && (
          <div className="flex">
            <Spinner color={colors.colorText} className="mr-1" />
            <span className="font-medium" style={{color: colors.colorText}}>Saving...</span>
          </div>
        )}
      </div>
      <div className="p-4 rounded-[0_0_4px_4px]">
        <textarea
          ref={textareaRef}
          className="w-full h-full p-2 select-none resize-none text-base bg-inherit font-medium outline-none"
          style={{ color: colors.colorText }}
          defaultValue={body}
          onChange={handleBodyChange}
          onInput={() => autoGrow(textareaRef.current)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

NotesCard.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NotesCard;
