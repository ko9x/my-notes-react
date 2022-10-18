import classes from "./Header.module.css";
import { useState, useRef } from "react";

export default function Header({ bookNames, selectedBook, searchItem }) {
  const [activeBook, setActiveBook] = useState(null);
  const inputRef = useRef();

  function handleBookSelection(book) {
    selectedBook(book);
    setActiveBook(book);
  }

  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === "") {
      return;
    }
    searchItem(value);
    inputRef.current.value = "";
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
        <form onSubmit={onSubmit}>
          <input placeholder="search" type="search" ref={inputRef} />
        </form>
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
