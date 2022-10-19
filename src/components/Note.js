import classes from "./Note.module.css";
import { useEffect, useState } from "react";
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

export default function Note({ selectedNotes, bookIsSelected, keyWord }) {
  useEffect(() => {
    hljs.highlightAll();
  });

  const [showingNoteDetails, setShowingNoteDetails] = useState(false);

  function showNoteDetails(note) {
    return (
      <div className={classes.detailContainer}>
        <p className={classes.detail}>Book: {note.book}</p>
        <p className={classes.detail}>Page: {note.page}</p>
        <p className={classes.detail}>Section: {note.section}</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {selectedNotes.length > 0 ? (
        selectedNotes.map((note) => (
          <div className={classes.note} key={note.id}>
            {showingNoteDetails && showNoteDetails(note)}
            <h1
              onClick={() => {
                setShowingNoteDetails(prevState => !prevState);
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
