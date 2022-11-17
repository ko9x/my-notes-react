import classes from "./Note.module.css";
import { useEffect, useState, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Highlighter from "react-highlight-words";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function highlightKeyWord(myStr, myKeyWord) {
  const highlightedHtml = myStr.replaceAll(
    myKeyWord,
    `<mark>${myKeyWord}</mark>`
  );
  return highlightedHtml;
}

export default function Note({
  selectedNotes,
  bookIsSelected,
  keyWord,
  editPressed,
  removeNoteFromArrays,
}) {
  useEffect(() => {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
  });

  useEffect(() => {
    setDisplayedNotes(selectedNotes);
  }, [selectedNotes]);

  const [displayedNotes, setDisplayedNotes] = useState(null);
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

  function deleteNote(note) {
    fetch(`https://my-notes-64d6a.firebaseio.com/notes/${note.id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          removeNoteFromArrays(note);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("error", error); //@DEBUG
      });
  }

  function handleAlert(note) {
    confirmAlert({
      title: "Delete note?",
      message: "This action cannot be undone",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteNote(note),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  }

  function showNoteDetails(note) {
    return (
      <div className={classes.noteDetailContainer}>
        <div className={classes.descriptionContainer}>
          <p className={classes.description}>Book: {note.book}</p>
          <p className={classes.description}>Page: {note.page}</p>
          <p className={classes.description}>Section: {note.section}</p>
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.editButton}>
            <button onClick={() => handleNoteEditPress(note)}>Edit Note</button>
          </div>
          <button onClick={() => handleAlert(note)}>Delete Note</button>
        </div>
      </div>
    );
  }

  function handleSetNoteDetails(newNoteId) {
    if (showingNoteDetails === newNoteId) {
      setShowingNoteDetails(null);
    } else {
      setShowingNoteDetails(newNoteId);
    }
  }

  if (!displayedNotes) {
    return <p>loading...</p>;
  }

  return (
    <div className={classes.container}>
      {/* <button onClick={() => scrollToNote()}>Scroll to note</button> */}
      {displayedNotes?.length > 0 ? (
        displayedNotes?.map((note, index) => (
          // the ref is only added if the note.id matches the stored noteId
          <div
            onClick={() => {
              handleSetNoteDetails(note.id);
            }}
            className={classes.note}
            key={`${note.id}${index}`}
            ref={note.id === noteId ? noteRef : null}
          >
            {/* <button onClick={() => storeNoteId(note.id)}>Click Me</button> */}
            <div
              className={`${
                showingNoteDetails === note.id
                  ? classes.detailOpen
                  : classes.detailClosed
              }`}
            >
              {showingNoteDetails === note.id && showNoteDetails(note)}
            </div>
            <h1>
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
            {note.important && note.important.length > 0 && (
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
