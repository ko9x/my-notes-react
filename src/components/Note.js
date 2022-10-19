import classes from "./Note.module.css";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Highlighter from "react-highlight-words";

function highlightKeyWord(myStr, myKeyWord) {

  let regEx = new RegExp(myKeyWord, 'ig')

  const highlightedHtml = myStr.replaceAll(
    regEx,
    `<mark>${myKeyWord}</mark>`
  );
  return highlightedHtml;
}

export default function Note({ selectedNotes, bookIsSelected, keyWord }) {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className={classes.container}>
      {selectedNotes.length > 0 ? (
        selectedNotes.map((note) => (
          <div className={classes.note} key={note.id}>
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
