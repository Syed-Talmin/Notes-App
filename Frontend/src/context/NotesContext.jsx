import React, { createContext, useState} from "react";

const NotesContext = createContext();


export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
 
  const value = {
    notes,
    setNotes
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export default NotesContext;
