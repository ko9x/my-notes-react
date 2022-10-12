import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import SideBar from "./components/SideBar";

export default function App() {
  const NotesAPI = "https://my-notes-64d6a.firebaseio.com";

  const [notes, setNotes] = useState([]);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(null);

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

    setBooks(bookArr);
  }

  function getPages(myArr, book) {
    const pageArr = [];
    for (const key in myArr) {
      if (myArr[key].book === book) {
        const page = myArr[key].page;
        if (!pageArr.includes(page)) {
          pageArr.push(page);
        }
      }
    }
    setPages(pageArr);
  }

  function getSections(myArr, book, page) {
    const sectionNameArr = [];
    const sectionArr = [];
    for (const key in myArr) {
      const note = myArr[key];
      if (myArr[key].book === book) {
        if (myArr[key].page === page) {
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
    setPages(keyWordObjectsArr);
  }

  function selectedBook(book) {
    getPages(notes, book);
    setBook(book);
  }
  function selectedPage(page) {
    // getSections(notes, book, page)
    setPage(page);
  }

  return (
    <div className="App">
      <Header bookNames={books} selectedBook={selectedBook} />
      <div style={{display: 'flex', justifyContent: 'flex-start', width: "200px", float: 'left'}}>
      <SideBar itemName={pages} selectedItemName={selectedPage} side={'left'} />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', width: '200px', float: 'right'}}>
      <SideBar itemName={pages} selectedItemName={selectedPage} side={'right'} />
      </div>
      <header>
        <button onClick={() => getNotes()}>Fetch notes</button>
        <button disabled={notes.length < 1} onClick={() => getSections(notes, book, page)}>
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
