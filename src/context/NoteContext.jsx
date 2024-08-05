import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const contextData = {};

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? <Spinner /> : children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
