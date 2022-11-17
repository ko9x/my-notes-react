import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function Header({ bookNames, selectedBook, searchItem, defaultBook, newPressed }) {
  const [activeBook, setActiveBook] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    setActiveBook(defaultBook);
  }, [defaultBook])

  function handleBookSelection(book) {
    selectedBook(book);
    setActiveBook(book);
    if(book === 'new') {
      newPressed();
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === "") {
      return;
    }
    searchItem(value);
    inputRef.current.value = "";
    handleBookSelection(null);
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
