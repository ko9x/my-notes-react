import classes from "./Note.module.css";
import { useEffect, useState, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Highlighter from "react-highlight-words";

function highlightKeyWord(myStr, myKeyWord) {
  const highlightedHtml = myStr.replaceAll(
    myKeyWord,
    `<mark>${myKeyWord}</mark>`
  );
  return highlightedHtml;
}

export default function Note({ selectedNotes, bookIsSelected, keyWord, editPressed }) {
  useEffect(() => {
    hljs.highlightAll();
  });

  const [showingNoteDetails, setShowingNoteDetails] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const noteRef = useRef(null);

  function storeNoteId(id) {
    setNoteId(id);
  }

  function scrollToNote() {
    noteRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  function handleNoteEditPress(note) {
    editPressed(note);
  }

  function showNoteDetails(note) {
    return (
      <div style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex'}} >
        <div className={classes.detailContainer}>
          <p className={classes.detail}>Book: {note.book}</p>
          <p className={classes.detail}>Page: {note.page}</p>
          <p className={classes.detail}>Section: {note.section}</p>
        </div>
        <div style={{ alignSelf: "center" }}>
          <button onClick={() => handleNoteEditPress(note)}>Edit Note</button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {/* <button onClick={() => scrollToNote()}>Scroll to note</button> */}
      {selectedNotes.length > 0 ? (
        selectedNotes.map((note) => (
          // the ref is only added if the note.id matches the stored noteId
          <div
            className={classes.note}
            key={note.id}
            ref={note.id === noteId ? noteRef : null}
          >
            {/* <button onClick={() => storeNoteId(note.id)}>Click Me</button> */}
            {showingNoteDetails && showNoteDetails(note)}
            <h1
              onClick={() => {
                setShowingNoteDetails((prevState) => !prevState);
              }}
            >
              <Highlighter
                highlightStyle={{ color: "#282c34" }}
                searchWords={[keyWord]}
                autoEscape={true}
                textToHighlight={note.title}
              />
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: highlightKeyWord(note.content, keyWord),
              }}
            ></p>
            {note.import && note.important.length > 0 && (
              <>
                <h3 style={{ color: "red" }}>Important Note</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightKeyWord(note.important, keyWord),
                  }}
                ></p>
              </>
            )}
            {note.side && note.side.length > 0 && (
              <>
                <h3 style={{ color: "orange" }}>Side Note</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightKeyWord(note.side, keyWord),
                  }}
                ></p>
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
