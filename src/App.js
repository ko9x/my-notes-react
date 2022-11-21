import classes from "./App.module.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import SideBar from "./components/SideBar.js";
import SideBarWall from "./components/SideBarWall.js";
import Note from "./components/Note.js";
import EditModal from "./modals/EditModal";

function addNote(arr, func, newNote, newNoteId) {
  let count = 0;
  const newArray = arr.map((note) => {
    if (note.id === newNoteId) {
      count++;
      return newNote;
    } else {
      return note;
    }
  });
  if (count < 1) {
    func((prevState) => {
      return prevState.concat(newNote);
    });
  } else {
    func(newArray);
  }
}

function removeNote(arr, func, newNoteId) {
  const newArray = arr.filter((note) => note.id !== newNoteId);
  func(newArray);
}

export default function App() {
  const NotesAPI = "https://my-notes-64d6a.firebaseio.com";

  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [bookNames, setBookNames] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [pageNames, setPageNames] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sectionNames, setSectionNames] = useState(null);
  const [searchItem, setSearchItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      getBooks(notes);
    }
  }, [notes]);

  async function getNotes() {
    const response = await fetch(`${NotesAPI}/notes.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quotes.");
    }

    // console.log("data", data); //@DEBUG

    const transformedNotes = [];

    for (const key in data) {
      const noteObj = {
        id: key,
        ...data[key],
      };
      transformedNotes.push(noteObj);
    }
    // console.log(transformedNotes);

    setNotes(transformedNotes);
  }

  function getBooks(myArr) {
    const bookArr = [];
    for (const key in myArr) {
      const book = myArr[key].book;
      if (!bookArr.includes(book)) {
        bookArr.push(book);
      }
    }

    setBookNames(bookArr);
  }

  function getPages(myArr, selectedBook) {
    const pageArr = [];
    for (const key in myArr) {
      if (myArr[key].book === selectedBook) {
        const page = myArr[key].page;
        if (!pageArr.includes(page)) {
          pageArr.push(page);
        }
      }
    }
    setPageNames(pageArr);
  }

  function getSections(myArr, selectedBook, selectedPage) {
    const sectionNameArr = [];
    const sectionArr = [];
    for (const key in myArr) {
      const note = myArr[key];
      if (myArr[key].book === selectedBook) {
        if (myArr[key].page === selectedPage) {
          const sectionName = myArr[key].section;
          sectionArr.push(note);
          if (!sectionNameArr.includes(sectionName)) {
            sectionNameArr.push(sectionName);
          }
        }
      }
    }
    setSectionNames(sectionNameArr);
    setSelectedNotes(sectionArr);
  }

  function getSingleSection(
    myArr,
    selectedBook,
    selectedPage,
    selectedSection
  ) {
    const singleSectionArr = [];
    for (const key in myArr) {
      const note = myArr[key];
      if (myArr[key].book === selectedBook) {
        if (myArr[key].page === selectedPage) {
          if (myArr[key].section === selectedSection) {
            singleSectionArr.push(note);
          }
        }
      }
    }
    setSelectedNotes(singleSectionArr);
  }

  function executeSearch(myArr, keyWord) {
    const keyWordObjectsArr = [];
    for (const key in myArr) {
      let myWord = myArr[key];
      if (myWord.title.includes(keyWord)) {
        keyWordObjectsArr.push(myWord);
      }
      if (myWord.content.includes(keyWord)) {
        keyWordObjectsArr.push(myWord);
      }
      if (myWord.important && myWord.important.includes(keyWord)) {
        keyWordObjectsArr.push(myWord);
      }
      if (myWord.side && myWord.side.includes(keyWord)) {
        keyWordObjectsArr.push(myWord);
      }
    }
    // Take an array with duplicate objects and make a unique array using the id for each object
    const arrWithDuplicates = keyWordObjectsArr;
    const ids = arrWithDuplicates.map((object) => object.id);
    const uniqueArr = arrWithDuplicates.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );

    setSearchItem(keyWord);
    setSelectedNotes(uniqueArr);
    setPageNames(null);
    setSectionNames(null);
  }

  function liftedSearchItem(searchItemBeingLifted) {
    executeSearch(notes, searchItemBeingLifted);
  }

  function liftedBook(bookBeingLifted) {
    if (bookBeingLifted === null) {
      //The user ran a search, which closes the SideBars so we need to set the selectedBook and selectedPage to null
      setSelectedBook(null);
      setSelectedPage(null);
      return;
    }
    if (bookBeingLifted === selectedBook) {
      return;
    } else {
      setSearchItem(null);
      setSelectedNotes([]);
      getPages(notes, bookBeingLifted);
      setSelectedBook(bookBeingLifted);
      setSectionNames(null);
    }
  }

  function liftedPage(pageBeingLifted) {
    if (searchItem) {
      return;
    }
    // @TODO Need to figure out a better way to handle this
    
    // if (pageBeingLifted === selectedPage) {
    //   return;
    // } else {
      getSections(notes, selectedBook, pageBeingLifted);
      setSelectedPage(pageBeingLifted);
    // }
  }

  function liftedSection(section) {
    getSingleSection(notes, selectedBook, selectedPage, section);
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function editPressed(note) {
    setNoteToEdit(note);
    handleModalOpen();
  }

  function newPressed() {
    handleModalOpen();
    setSelectedPage(null);
    setSelectedSection(null);
    setNoteToEdit(null);
  }

  function createdNote(newNote) {
    setNotes((prevState) => {
      return prevState.concat(newNote);
    });
    setSelectedNotes((prevState) => {
      return prevState.concat(newNote);
    });
    setSelectedSection(newNote.section);
    return;
  }

  function createdNoteLocation(newNote, tracker) {
    setSelectedBook(newNote.book);
    setSelectedPage(newNote.page);
    setSelectedSection(newNote.section);
    addNote(notes, setNotes, newNote, newNote.id);
    if (tracker.book) {
      setSectionNames([newNote.section]);
      setPageNames([newNote.page]);
    }
    if (!tracker.book && tracker.page) {
      setPageNames((prevState) => {
        return prevState.concat(newNote.page);
      })
      setSectionNames([newNote.section]);
    }
    if (!tracker.book && !tracker.page && tracker.section) {
      setSectionNames((prevState) => {
        return prevState.concat(newNote.section);
      });
    }
    setSelectedNotes([newNote]);
  }
  function changedNoteContent(newNote) {
    addNote(notes, setNotes, newNote, newNote.id);
    addNote(selectedNotes, setSelectedNotes, newNote, newNote.id);
  }
  function changedNoteLocation(newNote) {
    addNote(notes, setNotes, newNote, newNote.id);
    setSelectedNotes((prevState) => {
      return prevState.concat(newNote);
    });
    setSelectedSection(newNote.section);
  }

  function removeNoteFromArrays(note) {
    removeNote(notes, setNotes, note.id);
    removeNote(selectedNotes, setSelectedNotes, note.id);
  }

  return (
    <div className={classes.container}>
      <EditModal
        createdNoteLocation={createdNoteLocation}
        changedNoteContent={changedNoteContent}
        changedNoteLocation={changedNoteLocation}
        createdNote={createdNote}
        changeBook={liftedBook}
        changePage={liftedPage}
        changeSection={liftedSection}
        isModalOpen={isModalOpen}
        closeModal={handleCloseModal}
        noteToEdit={noteToEdit}
        bookList={bookNames}
        defaultBook={selectedBook}
        pageList={pageNames}
        defaultPage={selectedPage}
        sectionList={sectionNames}
        isSearching={searchItem}
      />
      <Header
        bookNames={bookNames}
        selectedBook={liftedBook}
        defaultBook={selectedBook}
        searchItem={liftedSearchItem}
        newPressed={newPressed}
        isModalOpen={isModalOpen}
      />
      <div className={classes.leftSideBarContainer}>
        <SideBarWall />
        <SideBar
          itemNameArray={pageNames}
          selectedItemName={liftedPage}
          defaultItem={selectedPage}
          sideBarPosition={"left"}
        />
      </div>
      <div className={classes.rightSideBarContainer}>
        <SideBar
          itemNameArray={sectionNames}
          selectedItemName={liftedSection}
          defaultItem={selectedSection}
          sideBarPosition={"right"}
        />
        <SideBarWall />
      </div>
      <Note
        selectedNotes={selectedNotes}
        bookIsSelected={pageNames && pageNames.length > 0}
        keyWord={searchItem}
        editPressed={editPressed}
        removeNoteFromArrays={removeNoteFromArrays}
      />
      <Footer />
    </div>
  );
}
