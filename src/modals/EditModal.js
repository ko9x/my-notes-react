import Modal from "react-modal";
import classes from "./EditModal.module.css";
import { useState } from "react";
import Radio from "../components/Radio";
import { useEffect } from "react";

const customStyles = {
  content: {
    height: "80vh",
    width: "70vw",
    position: "relative",
    zIndex: "200",
    marginLeft: "11vw",
    marginTop: "8vh",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "grey",
  },
};

export default function EditModal({
  isModalOpen,
  closeModal,
  noteToEdit,
  bookList,
  defaultBook,
  pageList,
  defaultPage,
  sectionList,
  changeBook,
  changePage,
  changeSection,
  isSearching,
  newPressed,
  createdNote,
  changedNoteLocation,
  changedNoteContent,
}) {
  const [contentSize, setContentSize] = useState("medium");
  const [sideSize, setSideSize] = useState(null);
  const [importantSize, setImportantSize] = useState(null);
  const [selectedBook, setSelectedBook] = useState(defaultBook);
  const [selectedPage, setSelectedPage] = useState(defaultPage);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSearch, setIsSearch] = useState(null);
  const [newBook, setNewBook] = useState({ changing: false, name: null });

  useEffect(() => {
    setSelectedBook(defaultBook);
    setSelectedPage(defaultPage);
  }, [defaultBook, defaultPage]);

  useEffect(() => {
    setIsSearch(isSearching);
  }, [isSearching]);

  useEffect(() => {
    if (!noteToEdit) {
      resetModal();
    }
  }, [noteToEdit]);

  function resetModal() {
    setSelectedBook(null);
    setSelectedPage(null);
    setSelectedSection(null);
  }

  // @TODO I'm sure there is a better way to refactor this
  function toggleContentSize() {
    if (contentSize === "large") {
      setContentSize("medium");
    } else {
      setContentSize("large");
    }
  }
  function toggleSideSize() {
    if (sideSize === null) {
      setSideSize("medium");
    } else {
      setSideSize(null);
    }
  }
  function toggleImportantSize() {
    if (importantSize === null) {
      setImportantSize("medium");
    } else {
      setImportantSize(null);
    }
  }
  function handleBookChange(e) {
    setSelectedBook(e.target.id);
    changeBook(e.target.id);
  }
  function handlePageChange(e) {
    setSelectedPage(e.target.id);
    changePage(e.target.id);
  }
  function handleSectionChange(e) {
    setSelectedSection(e.target.id);
    changeSection(e.target.id);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const url = noteToEdit
      ? `https://my-notes-64d6a.firebaseio.com/notes/${noteToEdit.id}.json`
      : "https://my-notes-64d6a.firebaseio.com/notes.json";

    const method = noteToEdit ? "PUT" : "POST";

    const updatedNote = {
      id: noteToEdit ? noteToEdit.id : null,
      book: newBook.name ? newBook.name : selectedBook,
      page: selectedPage,
      section: selectedSection ? selectedSection : noteToEdit.section,
      title: e.target.title.value,
      content: e.target.content.value,
      side: e.target.side.value,
      important: e.target.important.value,
    };

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => {
        if (response.status === 200) {
          if (!noteToEdit) {
            response.json().then((data) => {
              // Adding the firebase id to the note
              const newlyCreatedNote = { id: data.name, ...updatedNote };
              createdNote(newlyCreatedNote);
            });
          }
          if (noteToEdit && noteToEdit.section === updatedNote.section) {
            changedNoteContent(updatedNote);
          }
          if (noteToEdit && noteToEdit.section !== updatedNote.section) {
            changedNoteLocation(updatedNote);
          }
          closeModal();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  if (isSearch && noteToEdit) {
    changeBook(noteToEdit.book);
    setSelectedPage(noteToEdit.page);
    setIsSearch(false);
  }

  useEffect(() => {
    if (selectedPage && !sectionList) {
      changePage(selectedPage);
    }
  }, [selectedPage, changePage, sectionList]);

  function handleSetNewBookName(e) {
    if (e.target.value === "") {
      setNewBook({ ...newBook, name: selectedBook });
    } else {
      setNewBook({ ...newBook, name: e.target.value });
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <div>
          <div className={classes.radioTitle}>
            <h2>Select a Book</h2>
            <button
              onClick={() => setNewBook({ ...newBook, changing: true })}
              className={classes.newItemButton}
            >
              {newBook.name ? newBook.name : "new +"}
            </button>
          </div>
          {newBook.changing ? (
            <>
              {" "}
              <input
                type="text"
                placeholder={selectedBook}
                onChange={(e) => handleSetNewBookName(e)}
              />
              <button
                style={{ marginLeft: "1.5vw" }}
                onClick={() => setNewBook({ changing: false, name: null })}
              >
                Cancel
              </button>
            </>
          ) : (
            <Radio
              nameArray={bookList}
              selectedItem={
                selectedBook
                  ? selectedBook
                  : noteToEdit
                  ? noteToEdit?.book
                  : null
              }
              selectionFunction={handleBookChange}
            />
          )}
          <div className={classes.radioTitle}>
            <h2>Select a Page</h2>
            <button className={classes.newItemButton}>new +</button>
          </div>
          <Radio
            nameArray={pageList}
            selectedItem={
              selectedPage ? selectedPage : noteToEdit ? noteToEdit.page : null
            }
            selectionFunction={handlePageChange}
          />
          <div className={classes.radioTitle}>
            <h2>Select a Section</h2>
            <button className={classes.newItemButton}>new +</button>
          </div>
          <Radio
            nameArray={sectionList}
            selectedItem={
              selectedSection
                ? selectedSection
                : noteToEdit
                ? noteToEdit.section
                : null
            }
            selectionFunction={handleSectionChange}
          />
          <form onSubmit={handleSubmit}>
            <h2>Title</h2>
            <input
              type="text"
              id="title"
              defaultValue={noteToEdit?.title}
              className={classes.modalInput}
            />
            <h2 onClick={() => toggleContentSize()}>Content</h2>
            <textarea
              defaultValue={noteToEdit?.content}
              id="content"
              className={`${classes.modalTextArea} ${
                contentSize === "large"
                  ? classes.modalTextAreaLargeHeight
                  : classes.modalTextAreaMediumHeight
              }`}
            ></textarea>
            <h3 onClick={() => toggleImportantSize()}>Important Note</h3>
            <textarea
              defaultValue={noteToEdit?.important}
              id="important"
              placeholder={
                noteToEdit?.important ? null : "Add an important note"
              }
              className={`${classes.modalTextArea} ${
                importantSize === "medium"
                  ? classes.modalTextAreaMediumHeight
                  : null
              }`}
            ></textarea>
            <h3 onClick={() => toggleSideSize()}>Side Note</h3>
            <textarea
              defaultValue={noteToEdit?.side}
              id="side"
              placeholder={noteToEdit?.side ? null : "Add a side note"}
              className={`${classes.modalTextArea} ${
                sideSize === "medium" ? classes.modalTextAreaMediumHeight : null
              }`}
            ></textarea>
            <div style={{ width: "69.1%", paddingTop: "20px" }}>
              <button
                style={{ width: "30vw", borderRadius: "5px", float: "right" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className={classes.closeButtonContainer}>
          <button className={classes.closeButton} onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </Modal>
  );
}
