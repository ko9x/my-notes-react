import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";

export default function App() {
  const NotesAPI = "https://my-notes-64d6a.firebaseio.com";

  const [notes, setNotes] = useState([]);
  const [pages, setPages] = useState([]);

  async function getNotes() {
    const response = await fetch(`${NotesAPI}/notes.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quotes.");
    }

    const transformedNotes = [];

    // console.log('data', data); //@DEBUG

    const noteObj = {};

    for (const key in data) {
      if (
        data[key].page === "git" ||
        data[key].page === "angularfire" ||
        data[key].page === "misc" ||
        data[key].page === "ionic" ||
        data[key].page === "shortcuts" ||
        data[key].page === "reactnative" ||
        data[key].page === "reactjs" ||
        data[key].page === "docker" ||
        data[key].page === "vscode" ||
        data[key].page === "simulator" ||
        data[key].page === "interview"
      ) {
        noteObj[[key]] = { book: "developer", ...data[key] };
      }
      if (
        data[key].page === "3dprinting" ||
        data[key].page === "raspberrypi" ||
        data[key].page === "arduino"
      ) {
        noteObj[[key]] = { book: "hobby", ...data[key] };
      }
      if (data[key].page === "appletv" || data[key].page === "updates") {
        noteObj[[key]] = { book: "misc", ...data[key] };
      }
    }
    const myArr = [noteObj];
    console.log(JSON.stringify(myArr)); //@DEBUG

    setNotes(transformedNotes);
  }

  // function ShowPages() {
  //   if (notes.length > 1 && pages.length < 1) {
  //     return <p>Push the Show pages button</p>
  //   }
  //   if (pages.length < 1 && notes.length < 1) {
  //     return <p>Push the Fetch notes button</p>;
  //   }
  //   if (pages.length > 0) {
  //     return pages.map((page, index) => <p key={index}>{page}</p>)
  //   }
  // }

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
      <Header pageNames={pages} />
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
