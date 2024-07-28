import { fakeData as notes } from "../assets/fakeData.js";
import NoteCard from "../components/NoteCard.jsx";

function NotesPage() {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
}

export default NotesPage;