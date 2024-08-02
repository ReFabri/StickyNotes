import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard.jsx";
import { db } from "../appwrite/databases.js";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} setNotes={setNotes} key={note.$id} />
      ))}
    </div>
  );
}

export default NotesPage;
