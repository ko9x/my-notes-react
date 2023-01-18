import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function Header({
  bookNames,
  selectedBook,
  searchItem,
  defaultBook,
  newPressed,
  isModalOpen,
  user
}) {
  const [activeBook, setActiveBook] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    setActiveBook(defaultBook);
  }, [defaultBook]);

  function handleBookSelection(book) {
    if (book !== "new") {
      selectedBook(book);
      setActiveBook(book);
    }
    if (book === "new") {
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
      <h1 className={classes.logo}>{user ? `${user?.displayName}'s Notes`: 'My Notes'}</h1>
      <div className={classes.itemContainer}>
        {bookNames.map((book, index) => {
          return (
            <button
              disabled={isModalOpen ? true : false}
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
          disabled={isModalOpen ? true : false}
          onMouseDown={() => handleBookSelection("new")}
          className={classes.item}
        >
          new +
        </button>
        <form onSubmit={onSubmit}>
          <input
            disabled={isModalOpen ? true : false}
            placeholder="search"
            type="search"
            ref={inputRef}
          />
        </form>
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
