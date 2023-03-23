import classes from "./Note.module.css";
import { useEffect, useState, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Highlighter from "react-highlight-words";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FlatList from "flatlist-react";
import { remove, ref } from "firebase/database";
import { InView } from "react-intersection-observer";

function highlightKeyWord(myStr, myKeyWord) {
  const highlightedHtml = myStr.replaceAll(
    myKeyWord,
    `<mark>${myKeyWord}</mark>`
  );
  return highlightedHtml;
}

export default function Note({
  notes,
  selectedNotes,
  bookIsSelected,
  keyWord,
  editPressed,
  removeNoteFromArrays,
  database,
  user,
  handleSectionScroll,
  selectedSection,
  userClickedSection,
  setUserClickedSection,
  newlyAddedNote,
  isMobile,
  height,
  physicalSectionClick,
  setPhysicalSectionClick
}) {
  useEffect(() => {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
  });
  const [showingNoteDetails, setShowingNoteDetails] = useState(false);
  const [newlyAddedNoteId, setNewlyAddedNoteId] = useState(null);
  const [oneTime, setOneTime] = useState(false);
  const noteRef = useRef(null);

  useEffect(() => {
    if (userClickedSection) {
      scrollToNote();
      setUserClickedSection(false);
    }
  }, [selectedSection]);

  useEffect(() => {
    if(physicalSectionClick) {
      scrollToNote();
      setPhysicalSectionClick(false);
    }
  }, [physicalSectionClick])

  useEffect(() => {
    if (newlyAddedNote) {
      if (newlyAddedNoteId === newlyAddedNote.id) {
        setTimeout(() => {
          scrollToSpecificNote();
        }, 500);
      } else {
        setNewlyAddedNoteId(newlyAddedNote.id);
      }
    }
  }, [newlyAddedNote]);

  useEffect(() => {
    if (newlyAddedNoteId) {
      setTimeout(() => {
        scrollToSpecificNote();
      }, 500);
    }
  }, [newlyAddedNoteId]);

  function scrollToSpecificNote() {
    noteRef.current.scrollIntoView();
  }

  function scrollToNote() {
    const element = document.getElementById(`${selectedSection}Separator`);

    if (element) {
      element.scrollIntoView({behavior: 'instant', block: physicalSectionClick ? 'start' : 'nearest'});
    }
  }

  function inViewHandler(inView, entry) {
    if (inView && !keyWord) {
      handleSectionScroll(entry.target.id);
    }
  }

  function handleNoteEditPress(note) {
    editPressed(note);
  }

  function deleteNote(note) {
    remove(ref(database, `notes/${user.uid}/${note.id}`)).then(() => {
      removeNoteFromArrays(note);
    });
  }

  function handleAlert(note) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1>Delete Note?</h1>
            <h3>This action cannot be undone</h3>
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => {
                deleteNote(note);
                onClose();
              }}
            >
              Yes
            </button>
          </div>
        );
      },
    });
  }

  function handleSetNoteDetails(newNoteId) {
    if (showingNoteDetails === newNoteId) {
      setShowingNoteDetails(null);
    } else {
      setShowingNoteDetails(newNoteId);
    }
  }

  function determineRef(note) {
    if (keyWord) {
      if (newlyAddedNoteId) {
        setNewlyAddedNoteId(null);
      }
      if (note.id === searchedNotesIdArray[0]) {
        return noteRef;
      } else {
        return null;
      }
    }
    if (newlyAddedNoteId) {
      if (note.id === newlyAddedNoteId) {
        return noteRef;
      } else {
        return null;
      }
    }
  }

  const searchedNotesIdArray = [];

  function renderItem(note, index) {
    if (keyWord) {
      searchedNotesIdArray.push(note.id);
    }
    if (searchedNotesIdArray.length > 1) {
      if (!oneTime) {
        setTimeout(() => {
          scrollToSpecificNote();
          setOneTime(true);
        }, 500);
      }
    }

    return (
      <InView
        as="div"
        delay={500}
        key={note.id}
        id={note.section}
        onChange={(inView, entry) => inViewHandler(inView, entry)}
      >
        <div
          onClick={() => {
            handleSetNoteDetails(note.id);
          }}
          className={classes.note}
          ref={determineRef(note)}
        >
          <div style={{minHeight: '35px'}}>
            <div
              className={`${classes.noteDetailContainer} ${
                showingNoteDetails === note.id
                  ? classes.detailOpen
                  : classes.detailClosed
              }`}
            >
              <>
                <div className={classes.descriptionContainer}>
                  <p className={classes.description}>{`${note.book} >`}</p>
                  <p className={classes.description}>{`${note.page} >`}</p>
                  <p className={classes.description}>{note.section}</p>
                </div>
                <div className={classes.buttonContainer}>
                  <div className={classes.editButton}>
                    <button className={classes.customButton} onClick={() => handleNoteEditPress(note)}>
                      edit
                    </button>
                  </div>
                  <button className={classes.customButton} onClick={() => handleAlert(note)}>delete</button>
                </div>
              </>
            </div>
          </div>
          <h1 style={{marginTop: '0'}}>
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
      </InView>
    );
  }

  function DetermineHelperText() {
    if (user) {
      if (notes.length < 1) {
        return "Please click 'new +' to create your first note ";
      } else {
        return "Please select a book, enter a search term, or create a new note";
      }
    } else {
      return "Please sign in or create an account";
    }
  }

  const groupSeparator = (group, idx, groupLabel) => (
    <>
      <h1 id={`${groupLabel}Separator`} className={classes.groupSeparator}>
        {groupLabel}
      </h1>
      <hr></hr>
    </>
  );

  return (
    <div className={classes.container} style={{ height: height }}>
      {bookIsSelected || keyWord ? (
        <div style={{ height: 900, overflow: "auto" }}>
          {selectedNotes.length > 0 || keyWord ? (
            <FlatList
              searchTerm={keyWord ? keyWord : null}
              searchBy={["content", "title", "important", "side"]}
              list={keyWord ? notes : selectedNotes}
              renderItem={renderItem}
              searchCaseInsensitive
              groupBy="section"
              groupSeparator={groupSeparator}
            />
          ) : (
            <h1 className={classes.instructions}>
              {!isMobile
                ? "Please select a page from the sidebar"
                : 'Please select a page from the "page" dropdown'}
            </h1>
          )}
        </div>
      ) : (
        <h1 className={classes.instructions}>
          <DetermineHelperText />
        </h1>
      )}
    </div>
  );
}
