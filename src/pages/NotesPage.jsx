import NoteCard from "../components/NoteCard.jsx";
import Controls from "../components/Controls.jsx";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";

function NotesPage() {
  const { notes } = useContext(NoteContext);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  );
}

export default NotesPage;
