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
  const [sectionNames, setSectionNames] = useState([]);
  const [searchItem, setSearchItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [newNote, setNewNote] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      getBooks(notes);
    }
  }, [notes]);

  useEffect(() => {
    if(newNote) {
      newFetchedNotes()
    }
  }, [bookNames]);

  async function getNotes() {
    const response = await fetch(`${NotesAPI}/notes.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quotes.");
    }

    const transformedNotes = [];

    for (const key in data) {
      const noteObj = {
        id: key,
        ...data[key],
      };
      transformedNotes.push(noteObj);
    }
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
    setSelectedSection(selectedSection);
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
    setPageNames([]);
    setSectionNames([]);
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
      setSectionNames([]);
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
    setNoteToEdit(null);
  }

  function newFetchedNotes() {
    getPages(notes, newNote.book);
    getSections(notes, newNote.book, newNote.page);
    setSelectedPage(newNote.page);
    setSelectedSection(newNote.section);
    getSingleSection(notes, newNote.book, newNote.page, newNote.section)
    setSelectedBook(newNote.book);
    setNewNote(null);
  }

  function locationChanged(newNote) {
    getNotes();
    setNewNote(newNote);
    setPageNames([]);
    setSectionNames([]);
    setSelectedPage(null);
    setSelectedSection(null);
  }

  function changedNoteContent(newNote) {
    addNote(notes, setNotes, newNote, newNote.id);
    addNote(selectedNotes, setSelectedNotes, newNote, newNote.id);
  }

  function removeNoteFromArrays(note) {
    removeNote(notes, setNotes, note.id);
    removeNote(selectedNotes, setSelectedNotes, note.id);
  }

  return (
    <div className={classes.container}>
      <EditModal
        changedNoteContent={changedNoteContent}
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
        defaultSection={selectedSection}
        isSearching={searchItem}
        locationChanged={locationChanged}
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
          itemNameArray={isModalOpen ? null : pageNames}
          selectedItemName={liftedPage}
          defaultItem={selectedPage}
          sideBarPosition={"left"}
        />
      </div>
      <div className={classes.rightSideBarContainer}>
        <SideBar
          itemNameArray={isModalOpen ? null : sectionNames}
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
