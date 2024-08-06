import { PropTypes } from "prop-types";
import DeleteButton from "./DeleteButton.jsx";
import { useState, useRef, useEffect } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";
import { db } from "../appwrite/databases.js";
import Spinner from "../icons/Spinner.jsx";

function NoteCard({ note }) {
  const [saving, setSaving] = useState(false);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const keyUpTimer = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  async function handleKeyUp() {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  }

  function mouseDown(e) {
    if (e.target.className === "card-header") {
      setZIndex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  }

  function mouseMove(e) {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  }

  async function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    db.notes.update(note.$id, { position: JSON.stringify(newPosition) });
    saveData("position", newPosition);
  }

  async function saveData(key, value) {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteCard;
