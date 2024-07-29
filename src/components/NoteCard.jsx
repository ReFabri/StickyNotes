import { PropTypes } from "prop-types";
import Trash from "../icons/Trash.jsx";
import { useState, useRef, useEffect } from "react";
import { setNewOffset, autoGrow, setZIndex } from "../utils.js";

function NoteCard({ note }) {
  const [position, setPosition] = useState(JSON.parse(note.position));

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  function mouseDown(e) {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
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

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

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
        <Trash />
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
        ></textarea>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteCard;
