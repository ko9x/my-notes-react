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
  isSearching
}) {
  const [contentSize, setContentSize] = useState("medium");
  const [sideSize, setSideSize] = useState(null);
  const [importantSize, setImportantSize] = useState(null);
  const [selectedBook, setSelectedBook] = useState(defaultBook);
  const [selectedPage, setSelectedPage] = useState(defaultPage);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSearch, setIsSearch] = useState(null);

  useEffect(() => {
    setSelectedBook(defaultBook);
    setSelectedPage(defaultPage);
  }, [defaultBook, defaultPage])

  useEffect(() => {
    setIsSearch(isSearching);
  }, [isSearching])

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
    changeBook(e.target.id)
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
    console.log("The title:", e.target.title.value);
    console.log("The content:", e.target.content.value);
    console.log("The side note:", e.target.side.value);
    console.log("The important note:", e.target.important.value);
  }

  if(isSearch && noteToEdit) {
    changeBook(noteToEdit.book);
    setSelectedPage(noteToEdit.page);
    setIsSearch(false);
  }

  useEffect(() => {
    if(selectedPage && !sectionList) {
      changePage(selectedPage);
    }
  }, [selectedPage, changePage, sectionList])

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
          <div className={classes.radioTitle}><h2>Select a Book</h2><button className={classes.newItemButton}>new +</button></div>
          <Radio nameArray={bookList} selectedItem={selectedBook ? selectedBook : noteToEdit ? noteToEdit?.book : null} selectionFunction={handleBookChange} />
          <div className={classes.radioTitle}><h2>Select a Page</h2><button className={classes.newItemButton}>new +</button></div>
          <Radio nameArray={pageList} selectedItem={selectedPage ? selectedPage : noteToEdit ? noteToEdit.page : null} selectionFunction={handlePageChange} />
          <div className={classes.radioTitle}><h2>Select a Section</h2><button className={classes.newItemButton}>new +</button></div>
          <Radio nameArray={sectionList} selectedItem={selectedSection ? selectedSection : noteToEdit ? noteToEdit.section : null} selectionFunction={handleSectionChange} />
          <form onSubmit={handleSubmit}>
            <h2>Title</h2>
            <input
              onChange={(e) => {
                console.log("input change", e);
              }}
              type="text"
              id="title"
              defaultValue={noteToEdit?.title}
              className={classes.modalInput}
            />
            <h2 onClick={() => toggleContentSize()}>Content</h2>
            <textarea
              defaultValue={noteToEdit?.content}
              id="content"
              onChange={(e) => {
                console.log("content change", e);
              }}
              className={`${classes.modalTextArea} ${
                contentSize === "large"
                  ? classes.modalTextAreaLargeHeight
                  : classes.modalTextAreaMediumHeight
              }`}
            ></textarea>
            <h3 onClick={() => toggleSideSize()}>Side Note</h3>
            <textarea
              defaultValue={noteToEdit?.side}
              id="side"
              onChange={(e) => {
                console.log("side change", e);
              }}
              placeholder={noteToEdit?.side ? null : "Add a side note"}
              className={`${classes.modalTextArea} ${
                sideSize === "medium" ? classes.modalTextAreaMediumHeight : null
              }`}
            ></textarea>
            <h3 onClick={() => toggleImportantSize()}>Important Note</h3>
            <textarea
              defaultValue={noteToEdit?.important}
              id="important"
              onChange={(e) => {
                console.log("important change", e);
              }}
              placeholder={noteToEdit?.side ? null : "Add an important note"}
              className={`${classes.modalTextArea} ${
                importantSize === "medium"
                  ? classes.modalTextAreaMediumHeight
                  : null
              }`}
            ></textarea>
            <div style={{width: '69.1%', paddingTop: '20px'}}>
              <button style={{ width: "30vw", borderRadius: "5px", float: 'right' }}>
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
