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
  isDemoMode,
  handleSectionScroll,
  selectedSection,
  userClickedSection,
  setUserClickedSection,
  newlyAddedNote,
  isMobile,
  height,
  physicalSectionClick,
  setPhysicalSectionClick,
  setIsLoading,
  modalBackgroundColor,
  textColor,
  disableDemoMode
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

  function handleDeleteAlert(note) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div style={{background: modalBackgroundColor, padding: '50px', borderRadius: '25px'}}>
            <h1 style={{color: textColor}}>Delete Note?</h1>
            <h3 style={{color: textColor}}>This action cannot be undone</h3>
            <button className={classes.customButton} onClick={onClose}>Cancel</button>
            <button
              className={classes.customButton}
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

  function handleDemoModeAlert() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div style={{background: modalBackgroundColor, padding: '50px', borderRadius: '25px'}}>
            <h1 style={{color: textColor}}>This action is disabled in demo mode</h1>
            <h3 style={{color: textColor}}>Exit demo mode?</h3>
            <button className={classes.customButton} onClick={onClose}>Cancel</button>
            <button
              className={classes.customButton}
              onClick={() => {
                disableDemoMode();
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

  // Add copy to clipboard functionality to the pre-code wrapped text
  async function copyCode(block) {
    let code = block.querySelector("code");
    let text = code.innerText;

    await navigator.clipboard.writeText(text);
  }

  const searchedNotesIdArray = [];

  // ****************** Start of renderItem function ***************************************************************
  function renderItem(note, index) {
  // Add copy to clipboard functionality to the pre-code wrapped text
  if(!isMobile) {
    let blocks = document.querySelectorAll('pre');
    blocks.forEach((block, index) => {
      let button = document.createElement('button');
      button.setAttribute("id", index);
      button.classList.add(classes.copyButton)
      button.innerText = 'copy';
      if(!document.getElementById(index)) {
        block?.appendChild(button);
      }
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await copyCode(block);
      });
    });
  }
    
    if (keyWord) {
      searchedNotesIdArray.push(note.id);
    }
    if (searchedNotesIdArray.length > 1) {
      if (!oneTime) {
        setTimeout(() => {
          scrollToSpecificNote();
          setOneTime(true);
          setIsLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
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
                  <button className={classes.customButton} onClick={() => isDemoMode ? handleDemoModeAlert() : handleNoteEditPress(note)}>edit</button>
                  <button className={classes.customButton} onClick={() => isDemoMode ? handleDemoModeAlert() : handleDeleteAlert(note)}>delete</button>
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
  // ****************** End of renderItem function ***************************************************************

  function DetermineHelperText() {
    if(isDemoMode) {
      return "Please select a book or enter a search term";
    }
    if (!isMobile) {
      if (notes.length < 1) {
        return "Please click 'new +' to create your first note ";
      } else {
        return "Please select a book, enter a search term, or create a new note";
      }
    } else {
      if (notes.length < 1) {
        return "Please tap 'add a new note' to create your first note or check out demo mode";
      } else {
        return "Please select a book, enter a search term, or create a new note";
      }
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

  function noMatchFound() {
    setIsLoading(false);
    return <h1>No matches found for search term " {keyWord} "</h1>
  }

  return (
    <div className={classes.container} style={{ height: height }}>
      {bookIsSelected || keyWord ? (
        <div style={{ height: 900, overflow: "auto" }}>
          {selectedNotes.length > 0 || keyWord ? (
            <FlatList
              searchTerm={keyWord && keyWord.slice(-1) !== '(' ? keyWord : null}
              searchBy={["content", "title", "important", "side"]}
              list={keyWord ? notes : selectedNotes}
              renderItem={renderItem}
              searchCaseInsensitive
              groupBy="section"
              groupSeparator={groupSeparator}
              renderWhenEmpty={noMatchFound}
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
