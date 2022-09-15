import "./App.css";
import { useState } from "react";

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

  function ShowPages() {
    if (notes.length > 1 && pages.length < 1) {
      return <p>Push the Show pages button</p>
    }
    if (pages.length < 1 && notes.length < 1) {
      return <p>Push the Fetch notes button</p>;
    } 
    if (pages.length > 0) {
      return pages.map((page, index) => <p key={index}>{page}</p>)
    }
  }

  function getPages(myArr) {
    const pageArr = [];
    for (const key in myArr) {
      const page = myArr[key].page
      if (!pageArr.includes(page)) {
        pageArr.push(page);
      }
    }

    setPages(pageArr);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ShowPages />
        <button onClick={() => getNotes()}>Fetch notes</button>
        <button disabled={notes.length < 1} onClick={() => getPages(notes)}>Show pages</button>
      </header>
    </div>
  );
}
