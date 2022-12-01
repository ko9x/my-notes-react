import Modal from "react-modal";
import classes from "./EditModal.module.css";
import { useState } from "react";
import { useEffect, useRef } from "react";
import HelperButtons from "../components/HelperButtons";
import RadioManager from "../components/RadioManager";

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

const helpers = {
  codeWrap: {id: 1, name: 'code-wrap', code: '<pre><code></code></pre>'},
  pTag: {id: 2, name: 'p-tag', code: '<p></p>'},
  aTag: {id: 3, name: 'a-tag', code: '<a href="" target="_blank"><a/>'},
  lineBreak: {id: 4, name: 'line-break', code: '<br>'},
  nonBreakingSpace: {id: 5, name: 'non-breaking-space', code: ' &nbsp '},
  listItem: {id: 6, name: 'list-item', code: '<li></li>'},
  openCaret: {id: 7, name: '<', code: '&#60'}
}

function setCursorPosition(cursorPosition, selectedRef, helper) {
  if(helper === helpers.aTag) {
    return selectedRef.current.selectionEnd = cursorPosition + 9;
  }
  if(helper === helpers.pTag) {
    return selectedRef.current.selectionEnd = cursorPosition + 3;
  }
  if(helper === helpers.codeWrap) {
    return selectedRef.current.selectionEnd = cursorPosition + 11;
  }
  if(helper === helpers.nonBreakingSpace) {
    return selectedRef.current.selectionEnd = cursorPosition + 7;
  }
  if(helper === helpers.listItem || helpers.lineBreak || helpers.openCaret) {
    return selectedRef.current.selectionEnd = cursorPosition + 4;
  }
}

function insertHelperText(selectedRef, helper) {
  let currentValue = selectedRef.current.value;
  let cursorPosition = selectedRef.current.selectionStart;
  let valueBeforeCursor = selectedRef.current.value.substring(0, cursorPosition);
  let valueAfterCursor = selectedRef.current.value.substring(cursorPosition, currentValue.length);
  selectedRef.current.value = valueBeforeCursor + helper.code + valueAfterCursor;
  selectedRef.current.focus();
  setCursorPosition(cursorPosition, selectedRef, helper);
}

export default function EditModal({
  isModalOpen,
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
  changeSection,
  isSearching,
  createdNote,
  changedNoteLocation,
  changedNoteContent,
  createdNoteLocation,
  locationChanged,
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

  const titleRef = useRef();
  const contentRef = useRef();
  const importantRef = useRef();
  const sideRef = useRef();

  useEffect(() => {
    setSelectedBook(defaultBook);
    setSelectedPage(defaultPage);
    setSelectedSection(defaultSection);
  }, [
    defaultBook,
    defaultPage,
    defaultSection,
  ]);

  useEffect(() => {
    setIsSearch(isSearching);
  }, [isSearching]);

  useEffect(() => {
    if (!noteToEdit) {
      resetModal();
    }
  }, [noteToEdit]);

  function resetModal() {
    setNewBook({ changing: false, name: null });
    setNewPage({ changing: false, name: null });
    setNewSection({ changing: false, name: null });
    setSelectedSection(null);
    setMissingBook(false);
    setMissingPage(false);
    setMissingSection(false);
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
    changeSection(e.target.id);
    setMissingSection(false);
  }

  function handleCloseModal() {
    resetModal();
    closeModal();
  }

  function locationMoved(updatedNote) {
    if (noteToEdit.book !== updatedNote.book) {
      return true;
    }
    if (noteToEdit.page !== updatedNote.page) {
      return true;
    }
    if (noteToEdit.section !== updatedNote.section) {
      return true;
    }
    return false;
  }

  function missingRadioValue() {
    if (newBook.name === null && selectedBook === null) {
      setMissingBook(true);
      return true;
    }
    if (newPage.name === null && selectedPage === null) {
      setMissingPage(true);
      return true;
    }
    if (newSection.name === null && selectedSection === null) {
      if (!noteToEdit) {
        setMissingSection(true);
        return true
      } else {
        if (noteToEdit.section) {
          setNewSection({...newSection, name: noteToEdit.section})
        } else {
          setMissingSection(true);
          return true;
        }
      }
    }
  }

  function missingTextValue() {
    if(titleRef.current?.value === '') {
      setMissingTitle(true);
      return true
    }
    if(contentRef.current?.value === '') {
      setMissingContent(true);
      return true
    }
  }
  // **************** Submit Handler Section Start ****************************
  function handleSubmit(e) {
    e.preventDefault();
    if(missingTextValue() || missingRadioValue()) {
      return
    }
    const url = noteToEdit
      ? `https://my-notes-64d6a.firebaseio.com/notes/${noteToEdit.id}.json`
      : "https://my-notes-64d6a.firebaseio.com/notes.json";

    const method = noteToEdit ? "PUT" : "POST";

    const updatedNote = {
      id: noteToEdit ? noteToEdit.id : null,
      book: newBook.name ? newBook.name : selectedBook,
      page: newPage.name ? newPage.name : selectedPage,
      section: newSection.name
        ? newSection.name
        : selectedSection
        ? selectedSection
        : noteToEdit.section,
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
        resetModal();
        if (response.status === 200) {
          if (!noteToEdit) {
            response.json().then((data) => {
              // Adding the firebase id to the note
              const newlyCreatedNote = { id: data.name, ...updatedNote };
              locationChanged(newlyCreatedNote);
            });
          } else {
            if (locationMoved(updatedNote)) {
              locationChanged(updatedNote);
            } else {
              changedNoteContent(updatedNote);
            }
          }
          handleCloseModal();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  // **************** Submit Handler Section End ****************************

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

  function determineRadioBookNameArray() {
    if(newBook.name) {
      return [newBook.name, ...bookList];
    } else {
      return bookList;
    }
  }

  function determineRadioPageNameArray() {
    if (newBook.name) {
      return newPage.name ? [newPage.name] : [];
    } else {
      return newPage.name ? [newPage.name, ...pageList] : pageList
    }
  }

  function determineRadioSectionNameArray() {
    if (newBook.name || newPage.name) {
      return newSection.name ? [newSection.name] : [];
    } else {
      return newSection.name ? [newSection.name, ...sectionList] : sectionList
    }
  }

  function handleEnableSubmitButton() {
    if (newBook.changing || newPage.changing || newSection.changing) {
      return true;
    }
  }

  function handleOnChangeInput(e, setFunc) {
    if(e.target.value !== '') {
      setFunc(false);
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <div>
          <RadioManager
            missingItem={missingBook}
            newItem={newBook}
            selectedProperty={selectedBook}
            handleSetNewItem={handleSetNewItem}
            itemList={bookList}
            setNewItem={setNewBook}
            itemPropertyName={'book'}
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
            itemPropertyName={'page'}
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
            itemPropertyName={'section'}
            setMissingItem={setMissingSection}
            determineSelectedItem={determineSelectedItem}
            noteToEdit={noteToEdit}
            handleItemChange={handleSectionChange}
            determinePropertyNameArray={determineRadioSectionNameArray}
          />
          <form onSubmit={handleSubmit}>
            <h2>Title</h2>
            <input
              ref={titleRef}
              type="text"
              id="title"
              defaultValue={noteToEdit?.title}
              className={classes.modalInput}
              placeholder='Enter a title'
              onChange={e => handleOnChangeInput(e, setMissingTitle)}
            />
            {missingTitle && <p className={classes.validationWarning}>Title is required</p>}
            <div className={classes.textAreaHeaderContainer}>
              <h2 onClick={() => toggleContentSize()}>Content</h2>
              <HelperButtons insertHelperText={insertHelperText} selectedRef={contentRef} helpers={helpers} />
            </div>
            <textarea
              ref={contentRef}
              onChange={e => handleOnChangeInput(e, setMissingContent)}
              defaultValue={noteToEdit?.content}
              placeholder='Enter content'
              id="content"
              className={`${classes.modalTextArea} ${
                contentSize === "large"
                  ? classes.modalTextAreaLargeHeight
                  : classes.modalTextAreaMediumHeight
              }`}
            ></textarea>
            {missingContent && <p className={classes.validationWarning}>Content is required</p>}
            <div className={classes.textAreaHeaderContainer}>
              <h2 onClick={() => toggleImportantSize()}>Important Note</h2>
              <HelperButtons insertHelperText={insertHelperText} selectedRef={importantRef} helpers={helpers} />
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
              <h2 onClick={() => toggleSideSize()}>Side Note</h2>
              <HelperButtons insertHelperText={insertHelperText} selectedRef={sideRef} helpers={helpers} />
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
            <div style={{ width: "69.1%", paddingTop: "20px" }}>
              <button
                disabled={handleEnableSubmitButton()}
                style={{ width: "30vw", borderRadius: "5px", float: "right" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className={classes.closeButtonContainer}>
          <button className={classes.closeButton} onClick={handleCloseModal}>
            close
          </button>
        </div>
      </div>
    </Modal>
  );
}
