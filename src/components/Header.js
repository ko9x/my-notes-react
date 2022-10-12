import classes from "./Header.module.css";
import { useState } from "react";

export default function Header({ bookNames, selectedBook }) {
  const [activeBook, setActiveBook] = useState(null);

  function handleBookSelection(book) {
    selectedBook(book);
    setActiveBook(book);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.logo}>My Notes</h1>
      <div className={classes.itemContainer}>
        {bookNames.map((book, index) => {
          return (
            <button
              onMouseDown={() => handleBookSelection(book)}
              className={`${classes.item} ${
                activeBook === book ? classes.active : null
              }`}
              key={index}
            >
              {book}
            </button>
          );
        })}
        <button
          onMouseDown={() => handleBookSelection("new")}
          onMouseUp={() => handleBookSelection(null)}
          className={`${classes.item} ${
            activeBook === "new" ? classes.active : null
          }`}
        >
          new +
        </button>
        <input placeholder="search" />
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
