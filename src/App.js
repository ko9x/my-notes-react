import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import { useEffect } from "react";

export default function App() {
  const NotesAPI = "https://my-notes-64d6a.firebaseio.com";

  const [notes, setNotes] = useState([]);
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if(notes.length > 0) {
      getBooks(notes);
      getPages(notes);
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
    console.log(transformedNotes);

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

  function getPages(myArr) {
    const pageArr = [];
    for (const key in myArr) {
      const page = myArr[key].page;
      if (!pageArr.includes(page)) {
        pageArr.push(page);
      }
    }

    setPages(pageArr);
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

  return (
    <div className="App">
      <Header pageNames={books} />
      <header className="App-header">
        {/* <ShowPages /> */}
        <button onClick={() => getNotes()}>Fetch notes</button>
        <button disabled={notes.length < 1} onClick={() => getPages(notes)}>
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
