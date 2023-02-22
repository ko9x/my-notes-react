import Modal from "react-modal";
import classes from "./EditModal.module.css";
import { useState } from "react";
import { useEffect, useRef } from "react";
import HelperButtons from "../components/HelperButtons";
import RadioManager from "../components/RadioManager";
import { ref, child, push, update } from "firebase/database";
import {
  insertHelperText,
  helpers,
  fixCaret,
} from "../helpers/HelperFunctions";

export default function EditModal({
  isEditModalOpen,
  closeModal,
  noteToEdit,
  bookList,
  defaultBook,
  pageList,
  defaultPage,
  sectionList,
  defaultSection,
  changeBook,
  changePage,
  isSearching,
  createdNote,
  changedNoteLocation,
  changedNoteContent,
  createdNoteLocation,
  locationChanged,
  user,
  database,
  setNewNote,
  width
}) {
  const [contentSize, setContentSize] = useState("medium");
  const [sideSize, setSideSize] = useState(null);
  const [importantSize, setImportantSize] = useState(null);
  const [selectedBook, setSelectedBook] = useState(defaultBook);
  const [selectedPage, setSelectedPage] = useState(defaultPage);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSearch, setIsSearch] = useState(null);
  const [newBook, setNewBook] = useState({ changing: false, name: null });
  const [newPage, setNewPage] = useState({ changing: false, name: null });
  const [newSection, setNewSection] = useState({ changing: false, name: null });
  const [missingTitle, setMissingTitle] = useState(false);
  const [missingContent, setMissingContent] = useState(false);
  const [missingBook, setMissingBook] = useState(false);
  const [missingPage, setMissingPage] = useState(false);
  const [missingSection, setMissingSection] = useState(false);
  const [missingRequiredInformation, setMissingRequiredInformation] =
    useState(false);

  const titleRef = useRef();
  const contentRef = useRef();
  const importantRef = useRef();
  const sideRef = useRef();

  useEffect(() => {
    setSelectedBook(defaultBook);
    setSelectedPage(defaultPage);
    return () => {
      resetModal();
    };
  }, [defaultBook, defaultPage, defaultSection]);

  useEffect(() => {
    setIsSearch(isSearching);
  }, [isSearching]);

  const customStyles = {
    content: {
      height: "80vh",
      width: "70vw",
      position: "relative",
      zIndex: "200",
      marginLeft: width > 750 ? "11vw" : null,
      marginTop: "8vh",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "grey",
      borderRadius: '10px'
    },
  };

  function resetModal() {
    setNewBook({ changing: false, name: null });
    setNewPage({ changing: false, name: null });
    setNewSection({ changing: false, name: null });
    setSelectedSection(null);
    setMissingBook(false);
    setMissingPage(false);
    setMissingSection(false);
    setMissingRequiredInformation(false);
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
    setNewBook({ changing: false, name: null });
    setSelectedBook(e.target.id);
    changeBook(e.target.id);
    setSelectedPage(null);
    setSelectedSection(null);
    setMissingBook(false);
  }
  function handlePageChange(e) {
    setNewPage({ changing: false, name: null });
    setSelectedPage(e.target.id);
    changePage(e.target.id);
    setSelectedSection(null);
    setMissingPage(false);
  }
  function handleSectionChange(e) {
    setNewSection({ changing: false, name: null });
    setSelectedSection(e.target.id);
    setMissingSection(false);
  }

  function handleManualCloseModal() {
    setNewNote(noteToEdit);
    handleCloseModal();
  }

  function handleCloseModal() {
    resetModal();
    closeModal();
  }

  function missingRadioValue() {
    if (newBook.name === null && selectedBook === null) {
      setMissingBook(true);
      return true;
    }
    if (
      newPage.name === null &&
      (selectedPage === null || !pageList.includes(selectedPage))
    ) {
      if (!noteToEdit) {
        setMissingPage(true);
        return true;
      } else {
        if (noteToEdit.page && noteToEdit.page !== "") {
          setNewPage({ ...newPage, name: noteToEdit.page });
        } else {
          setMissingSection(true);
          return true;
        }
      }
    }
    if (
      newSection.name === null &&
      (selectedSection === null || !sectionList.includes(selectedSection))
    ) {
      if (!noteToEdit) {
        setMissingSection(true);
        return true;
      } else {
        if (noteToEdit.section && noteToEdit.section !== "") {
          setNewSection({ ...newSection, name: noteToEdit.section });
        } else {
          setMissingSection(true);
          return true;
        }
      }
    }
  }

  function missingTextValue() {
    if (titleRef.current?.value === "") {
      setMissingTitle(true);
      return true;
    }
    if (contentRef.current?.value === "") {
      setMissingContent(true);
      return true;
    }
  }

  // **************** Submit Handler Section Start ******************************************************************************
  function handleSubmit(e) {
    e.preventDefault();
    if (missingTextValue() || missingRadioValue()) {
      setMissingRequiredInformation(true);
      return;
    }
    const newNoteKey = push(child(ref(database), "notes")).key;
    const url = noteToEdit
      ? `notes/${user.uid}/${noteToEdit.id}`
      : `notes/${user.uid}/${newNoteKey}`;

    const updatedNote = {
      id: noteToEdit ? noteToEdit.id : newNoteKey,
      book: newBook.name ? newBook.name : selectedBook,
      page: newPage.name
        ? newPage.name
        : selectedPage
        ? selectedPage
        : noteToEdit.page,
      section: newSection.name
        ? newSection.name
        : selectedSection
        ? selectedSection
        : noteToEdit.section,
      title: e.target.title.value,
      content: fixCaret(e.target.content.value),
      side: fixCaret(e.target.side.value),
      important: fixCaret(e.target.important.value),
    };

    update(ref(database, url), updatedNote)
      .then(() => {
        resetModal();
        locationChanged(updatedNote);
        handleCloseModal();
      })
      .catch((error) => {
        console.log("save failed", error); //@DEBUG
      });
  }

  // **************** Submit Handler Section End ******************************************************************************

  useEffect(() => {
    if (isSearch && noteToEdit) {
      changeBook(noteToEdit.book);
      changePage(noteToEdit.page, noteToEdit.book);
      setSelectedPage(noteToEdit.page);
      setSelectedSection(noteToEdit.section);
      setIsSearch(false);
    }
  }, [isSearch, noteToEdit]);

  useEffect(() => {
    if (selectedPage && !sectionList) {
      changePage(selectedPage);
    }
  }, [selectedPage, changePage, sectionList]);

  function handleSetNewItem(
    instruction,
    itemProperty,
    itemFunction,
    itemPropertyName,
    validationFunction
  ) {
    if (instruction.text === "setNameNull") {
      itemFunction({ ...itemProperty, name: null });
    }
    if (instruction.text === "hasValue") {
      itemFunction({ name: instruction.payload, changing: true });
    }
    if (instruction.text === "cancel") {
      itemFunction({ changing: false, name: null });
    }
    if (instruction.text === "confirm") {
      validationFunction(false);
      itemFunction({ changing: false, name: itemProperty.name });
    }
  }

  function determineSelectedItem(newItem, selectedItem, noteToEditItem) {
    if (newItem.name) {
      return newItem.name;
    }
    if (selectedItem) {
      return selectedItem;
    }
    if (noteToEdit) {
      return noteToEditItem;
    }
    if (!noteToEdit) {
      return null;
    }
  }

  // These determineArray functions could probably be refactored into one function
  function determineRadioBookNameArray() {
    if (newBook.name) {
      return [newBook.name, ...bookList];
    } else {
      return bookList;
    }
  }

  function determineRadioPageNameArray() {
    if (newBook.name) {
      return newPage.name ? [newPage.name] : [];
    } else {
      return newPage.name ? [newPage.name, ...pageList] : pageList;
    }
  }

  function determineRadioSectionNameArray() {
    if (newBook.name || newPage.name) {
      return newSection.name ? [newSection.name] : [];
    } else {
      return newSection.name ? [newSection.name, ...sectionList] : sectionList;
    }
  }

  function handleEnableSubmitButton() {
    if (newBook.changing || newPage.changing || newSection.changing) {
      return true;
    }
  }

  function handleOnChangeInput(e, setFunc) {
    if (e.target.value !== "") {
      setMissingRequiredInformation(false);
      setFunc(false);
    }
  }

  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={handleManualCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '1vw'}}>
          <RadioManager
            missingItem={missingBook}
            newItem={newBook}
            selectedProperty={selectedBook}
            handleSetNewItem={handleSetNewItem}
            itemList={bookList}
            setNewItem={setNewBook}
            itemPropertyName={"book"}
            setMissingItem={setMissingBook}
            determineSelectedItem={determineSelectedItem}
            noteToEdit={noteToEdit}
            handleItemChange={handleBookChange}
            determinePropertyNameArray={determineRadioBookNameArray}
          />
          <RadioManager
            missingItem={missingPage}
            newItem={newPage}
            selectedProperty={selectedPage}
            handleSetNewItem={handleSetNewItem}
            itemList={pageList}
            setNewItem={setNewPage}
            itemPropertyName={"page"}
            setMissingItem={setMissingPage}
            determineSelectedItem={determineSelectedItem}
            noteToEdit={noteToEdit}
            handleItemChange={handlePageChange}
            determinePropertyNameArray={determineRadioPageNameArray}
          />
          <RadioManager
            missingItem={missingSection}
            newItem={newSection}
            selectedProperty={selectedSection}
            handleSetNewItem={handleSetNewItem}
            itemList={sectionList}
            setNewItem={setNewSection}
            itemPropertyName={"section"}
            setMissingItem={setMissingSection}
            determineSelectedItem={determineSelectedItem}
            noteToEdit={noteToEdit}
            handleItemChange={handleSectionChange}
            determinePropertyNameArray={determineRadioSectionNameArray}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Title</h2>
            <input
              ref={titleRef}
              type="text"
              id="title"
              defaultValue={noteToEdit?.title}
              className={classes.modalInput}
              placeholder="Enter a title"
              onChange={(e) => handleOnChangeInput(e, setMissingTitle)}
            />
            {missingTitle && (
              <p className={classes.validationWarning}>Title is required</p>
            )}
            <div className={classes.textAreaHeaderContainer}>
              <div onClick={() => toggleContentSize()}>
                <h2 style={{ marginBottom: "0px" }}>Content</h2>
                <p
                  style={{ fontSize: "small", marginTop: "0px" }}
                >{`(click to expand)`}</p>
              </div>
              <HelperButtons
                insertHelperText={insertHelperText}
                selectedRef={contentRef}
                helpers={helpers}
              />
            </div>
            <textarea
              ref={contentRef}
              onChange={(e) => handleOnChangeInput(e, setMissingContent)}
              defaultValue={noteToEdit?.content}
              placeholder="Enter content"
              id="content"
              className={`${classes.modalTextArea} ${
                contentSize === "large"
                  ? classes.modalTextAreaLargeHeight
                  : classes.modalTextAreaMediumHeight
              }`}
            ></textarea>
            {missingContent && (
              <p className={classes.validationWarning}>Content is required</p>
            )}
            <div className={classes.textAreaHeaderContainer}>
              <div onClick={() => toggleImportantSize()}>
                <h2 style={{ marginBottom: "0px" }}>Important Note</h2>
                <p
                  style={{ fontSize: "small", marginTop: "0px" }}
                >{`(click to expand)`}</p>
              </div>
              <HelperButtons
                insertHelperText={insertHelperText}
                selectedRef={importantRef}
                helpers={helpers}
              />
            </div>
            <textarea
              ref={importantRef}
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
            <div className={classes.textAreaHeaderContainer}>
              <div onClick={() => toggleSideSize()}>
                <h2 style={{ marginBottom: "0px" }}>Side Note</h2>
                <p
                  style={{ fontSize: "small", marginTop: "0px" }}
                >{`(click to expand)`}</p>
              </div>
              <HelperButtons
                insertHelperText={insertHelperText}
                selectedRef={sideRef}
                helpers={helpers}
              />
            </div>
            <textarea
              ref={sideRef}
              defaultValue={noteToEdit?.side}
              id="side"
              placeholder={noteToEdit?.side ? null : "Add a side note"}
              className={`${classes.modalTextArea} ${
                sideSize === "medium" ? classes.modalTextAreaMediumHeight : null
              }`}
            ></textarea>
            <div style={{ width: "69.1%", paddingTop: "20px", paddingBottom: width < 750 ? '150px' : null }}>
              <button
                disabled={handleEnableSubmitButton()}
                className={classes.submitButton}
              >
                <p>Submit</p>
                <p style={{ color: "red" }}>
                  {missingRequiredInformation && "Please complete the form"}
                </p>
              </button>
            </div>
          </form>
        </div>
        {width > 750 ? <div className={classes.closeButtonContainer}>
          <button
            className={classes.closeButton}
            onClick={handleManualCloseModal}
          >
            close
          </button>
        </div> : null }
      </div>
    </Modal>
  );
}
