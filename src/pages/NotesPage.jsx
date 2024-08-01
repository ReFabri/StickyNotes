import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard.jsx";
import { databases } from "../appwrite/config.js";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_NOTES_ID
    );
    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
}

export default NotesPage;
