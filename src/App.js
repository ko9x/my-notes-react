import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import SideBar from "./components/SideBar";

export default function App() {
  const NotesAPI = "https://my-notes-64d6a.firebaseio.com";

  const [notes, setNotes] = useState([]);
  const [bookNames, setBookNames] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [pageNames, setPageNames] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

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
          if(!sectionNameArr.includes(sectionName)) {
            sectionNameArr.push(sectionName);
          }
        }
      }
    }
    console.log('sectionNameArr', sectionNameArr);
    console.log('sectionArr', sectionArr);
  }

  function executeSearch(myArr, keyWord) {
    const keyWordObjectsArr = [];
    for (const key in myArr) {
      let myWord = myArr[key];
      if (myWord.content.toLowerCase().includes(keyWord)) {
        keyWordObjectsArr.push(myWord.content);
      }
    }
    setPageNames(keyWordObjectsArr);
  }

  function liftedBook(selectedBook) {
    getPages(notes, selectedBook);
    setSelectedBook(selectedBook);
  }
  function liftedPage(page) {
    // getSections(notes, book, page)
    setSelectedPage(page);
  }

  return (
    <div className="App">
      <Header bookNames={bookNames} selectedBook={liftedBook} />
      <div style={{display: 'flex', justifyContent: 'flex-start', width: "200px", float: 'left'}}>
      <SideBar itemName={pageNames} selectedItemName={liftedPage} sideDisplayed={'left'} />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', width: '200px', float: 'right'}}>
      <SideBar itemName={pageNames} selectedItemName={liftedPage} sideDisplayed={'right'} />
      </div>
      <header>
        <button onClick={() => getNotes()}>Fetch notes</button>
        <button disabled={notes.length < 1} onClick={() => getSections(notes, selectedBook, selectedPage)}>
          Show pages
        </button>
        <button
          disabled={notes.length < 1}
          onClick={() => executeSearch(notes, "install")}
        >
          Find install
        </button>
        <div className="test">test</div>
      </header>
    </div>
  );
}
