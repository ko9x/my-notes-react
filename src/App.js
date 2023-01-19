import classes from "./App.module.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import SideBar from "./components/SideBar.js";
import SideBarWall from "./components/SideBarWall.js";
import Note from "./components/Note.js";
import SignUpLoginModal from "./modals/SignUpLoginModal";
import EditModal from "./modals/EditModal";
import { auth, database, signUserOut } from "./auth/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, onValue } from "firebase/database";

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
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [bookNames, setBookNames] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [pageNames, setPageNames] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sectionNames, setSectionNames] = useState([]);
  const [searchItem, setSearchItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSignUpLoginModalOpen, setIsSignUpLoginModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [newNote, setNewNote] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsSignUpLoginModalOpen(false);
      getNotes();
    } else {
      setIsSignUpLoginModalOpen(true);
    }
  }, [user]);

  useEffect(() => {
    if (notes.length > 0) {
      getBooks(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (newNote) {
      newFetchedNotes();
    }
  }, [bookNames]);

  async function getNotes() {
    const fetchedNotes = await ref(database, `/notes/${user.uid}`);
    onValue(fetchedNotes, (snapshot) => {
      const data = snapshot.val();
      const transformedNotes = [];

      for (const key in data) {
        const noteObj = {
          id: key,
          ...data[key],
        };
        transformedNotes.push(noteObj);
      }
      
      setNotes(transformedNotes);
    });
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
    // if(searchItem) {
    //   return;
    // }
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

  function liftedPage(pageBeingLifted, theBook) {
    if (searchItem) {
      getSections(notes, theBook, pageBeingLifted);
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
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setNoteToEdit(null);
  }

  function handleCloseSignUpLoginModal() {
    setIsSignUpLoginModalOpen(false);
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
    getSingleSection(notes, newNote.book, newNote.page, newNote.section);
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

  function handleLogInUser() {
    setIsSignUpLoginModalOpen(true);
  }

  function handleLogOutUser() {
    signUserOut();
    getBooks([]);
  }

  return (
    <div className={classes.container}>
      <SignUpLoginModal 
        isSignUpLoginModalOpen={isSignUpLoginModalOpen}
        closeModal={handleCloseSignUpLoginModal}
      />
      <EditModal
        changedNoteContent={changedNoteContent}
        changeBook={liftedBook}
        changePage={liftedPage}
        changeSection={liftedSection}
        isEditModalOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        noteToEdit={noteToEdit}
        bookList={bookNames}
        defaultBook={selectedBook}
        pageList={pageNames}
        defaultPage={selectedPage}
        sectionList={sectionNames}
        defaultSection={selectedSection}
        isSearching={searchItem}
        locationChanged={locationChanged}
        user={user}
        database={database}
      />
      <Header
        bookNames={bookNames}
        selectedBook={liftedBook}
        defaultBook={selectedBook}
        searchItem={liftedSearchItem}
        newPressed={newPressed}
        isModalOpen={isEditModalOpen || isSignUpLoginModalOpen}
        user={user}
        signIn={handleLogInUser}
        signOut={handleLogOutUser}
      />
      <div className={classes.leftSideBarContainer}>
        <SideBarWall />
        <SideBar
          itemNameArray={isEditModalOpen ? null : pageNames}
          selectedItemName={liftedPage}
          defaultItem={selectedPage}
          sideBarPosition={"left"}
        />
      </div>
      <div className={classes.rightSideBarContainer}>
        <SideBar
          itemNameArray={isEditModalOpen ? null : sectionNames}
          selectedItemName={liftedSection}
          defaultItem={selectedSection}
          sideBarPosition={"right"}
        />
        <SideBarWall />
      </div>
      <Note
        notes={notes}
        selectedNotes={selectedNotes}
        bookIsSelected={pageNames && pageNames.length > 0}
        keyWord={searchItem}
        editPressed={editPressed}
        removeNoteFromArrays={removeNoteFromArrays}
        user={user}
        database={database}
      />
      <Footer />
    </div>
  );
}
