import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { fetchNotes } from "../utils/dbUtils";
import Spinner from "../icons/Spinner";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userId");
    return storedUser ? storedUser : null;
  });
  const [isAuthPopupShown, setIsAuthPopupShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNotes(user);
      data ? setNotes(data) : setNotes([]);
      setLoading(false);
    }
    fetchData();
  },[user]);

  const logOut = () => {
    localStorage.clear();
    setNotes([]);
    setUser(null);
  }

  const contextValue = { notes, setNotes, selectedNote, setSelectedNote, user, setUser, isAuthPopupShown, setIsAuthPopupShown, setLoading, logOut };

  return (
    <NotesContext.Provider value={contextValue}>
        {loading ? <div className="h-screen w-screen grid place-content-center">
            <Spinner className="size-20"/>
        </div> : children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotesProvider;