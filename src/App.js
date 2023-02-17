import classes from "./App.module.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import SideBar from "./components/SideBar.js";
import SideBarWall from "./components/SideBarWall.js";
import Note from "./components/Note.js";
import SignUpLoginModal from "./modals/SignUpLoginModal";
import EditModal from "./modals/EditModal";
import {
  auth,
  database,
  signUserOut,
  handleDeleteUser,
} from "./auth/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, onValue } from "firebase/database";
import { createArrays } from "./helpers/HelperFunctions";
import useWindowDimensions from "./hooks/useWindowDimensions";

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
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [userClickedSection, setUserClickedSection] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (user) {
      setIsSignUpLoginModalOpen(false);
      getNotes();
      if (user.displayName) {
        setNewDisplayName(user.displayName);
      }
    } else {
      setNewDisplayName(null);
      setIsSignUpLoginModalOpen(true);
    }
  }, [user]);

  useEffect(() => {
    if (notes.length > 0) {
      createArrays(notes, setBookNames);
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

  function executeSearch(keyWord) {
    setNewNote(null);
    setSearchItem(keyWord);
    setPageNames([]);
    setSectionNames([]);
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
      createArrays(notes, null, bookBeingLifted, setPageNames);
      setSelectedBook(bookBeingLifted);
      setSelectedPage(null);
      setSectionNames([]);
    }
  }

  function liftedPage(pageBeingLifted, theBook) {
    if (searchItem) {
      createArrays(
        notes,
        null,
        theBook,
        null,
        pageBeingLifted,
        setSectionNames,
        setSelectedNotes
      );
      return;
    }
    createArrays(
      notes,
      null,
      selectedBook,
      null,
      pageBeingLifted,
      setSectionNames,
      setSelectedNotes
    );
    setSelectedPage(pageBeingLifted);
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
    createArrays(notes, null, newNote.book, setPageNames);
    createArrays(
      notes,
      null,
      newNote.book,
      null,
      newNote.page,
      setSectionNames,
      setSelectedNotes
    );
    setSelectedPage(newNote.page);
    setSelectedSection(newNote.section);
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

  function removeNoteFromArrays(note) {
    removeNote(notes, setNotes, note.id);
    removeNote(selectedNotes, setSelectedNotes, note.id);
  }

  function handleLogInUser() {
    setIsSignUpLoginModalOpen(true);
  }

  function handleLogOutUser() {
    setNewDisplayName(null);
    signUserOut();
    resetNotes();
  }

  function resetNotes() {
    setBookNames([]);
    setSelectedBook(null);
    setPageNames([]);
    setSelectedPage(null);
    setSectionNames([]);
    setSelectedSection(null);
  }

  function handleNewDisplayName(newName) {
    setNewDisplayName(newName);
  }

  function handleSectionScroll(sectionName) {
    setSelectedSection(sectionName);
  }

  function getSelectedSection(sectionName) {
    setSelectedSection(sectionName);
    setUserClickedSection(true);
  }

  return (
    <div className={classes.container}>
      {/* <button onClick={()=> handleDeleteUser(user)}>Delete</button> */}
      <SignUpLoginModal
        isSignUpLoginModalOpen={isSignUpLoginModalOpen}
        closeModal={handleCloseSignUpLoginModal}
        handleNewDisplayName={handleNewDisplayName}
      />
      <EditModal
        changeBook={liftedBook}
        changePage={liftedPage}
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
        setNewNote={setNewNote}
      />
      <Header
        bookNames={bookNames}
        pageNames={pageNames}
        sectionNames={sectionNames}
        selectedBook={liftedBook}
        selectedPage={liftedPage}
        selectedSection={getSelectedSection}
        defaultBook={selectedBook}
        searchItem={executeSearch}
        newPressed={newPressed}
        isModalOpen={isEditModalOpen || isSignUpLoginModalOpen}
        user={user}
        signIn={handleLogInUser}
        signOut={handleLogOutUser}
        newDisplayName={newDisplayName}
        width={width}
        height={height}
      />
      {width > 750 && (
        <div className={classes.leftSideBarContainer}>
          <SideBarWall />
          <SideBar
            itemNameArray={isEditModalOpen ? null : pageNames}
            selectedItemName={liftedPage}
            defaultItem={selectedPage}
            sideBarPosition={"left"}
          />
        </div>
      )}
      {width > 750 && (
        <div className={classes.rightSideBarContainer}>
          <SideBar
            itemNameArray={isEditModalOpen ? null : sectionNames}
            selectedItemName={getSelectedSection}
            defaultItem={selectedSection}
            sideBarPosition={"right"}
          />
          <SideBarWall />
        </div>
      )}
      <Note
        notes={notes}
        selectedNotes={selectedNotes}
        bookIsSelected={pageNames && pageNames.length > 0}
        keyWord={searchItem}
        editPressed={editPressed}
        removeNoteFromArrays={removeNoteFromArrays}
        user={user}
        database={database}
        handleSectionScroll={handleSectionScroll}
        selectedSection={selectedSection}
        userClickedSection={userClickedSection}
        setUserClickedSection={setUserClickedSection}
        newlyAddedNote={newNote}
        width={width}
      />
      <Footer width={width} height={height} user={user} signOut={handleLogOutUser} />
    </div>
  );
}
