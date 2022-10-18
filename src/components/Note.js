import classes from "./Note.module.css";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function Note({ selectedNotes, bookIsSelected }) {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className={classes.container}>
      {selectedNotes.length > 0 ? (
        selectedNotes.map((note) => (
          <div className={classes.note} key={note.id}>
            <h1>{note.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            {note.import && note.important.length > 0 && (
              <>
                <h3 style={{ color: "red" }}>Important Note</h3>
                <p dangerouslySetInnerHTML={{ __html: note.important }}></p>
              </>
            )}
            {note.side && note.side.length > 0 && (
              <>
                <h3 style={{ color: "orange" }}>Side Note</h3>
                <p dangerouslySetInnerHTML={{ __html: note.side }}></p>
              </>
            )}
          </div>
        ))
      ) : (
        <div>
          {!bookIsSelected && (
            <h1 className={classes.instructions}>
              Select a book from the Header to begin
            </h1>
          )}
          {bookIsSelected && (
            <h2 className={classes.instructions}>
              Select a page from the left SideBar
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
