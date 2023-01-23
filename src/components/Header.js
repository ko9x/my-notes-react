import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { auth } from '../auth/firebase.js'

export default function Header({
  bookNames,
  selectedBook,
  searchItem,
  defaultBook,
  newPressed,
  isModalOpen,
  user,
  signIn,
  signOut,
  newDisplayName,
}) {
  const [activeBook, setActiveBook] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    setActiveBook(defaultBook);
  }, [defaultBook]);

  useEffect(() => {
    setDisplayName(newDisplayName);
  }, [newDisplayName])

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

  function disabledButtonCheck() {
    if (isModalOpen) {
      return true;
    }
    if (!user) {
      return true;
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <h1 className={classes.logo}>
          {displayName ? `${displayName}'s Notes` : 'My Notes'}
        </h1>
      </div>
      <div className={classes.bookContainer}>
        {bookNames.map((book, index) => {
          return (
            <button
              disabled={disabledButtonCheck()}
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
      </div>
      <div className={classes.rightSideContainer}>
        <div className={classes.rightSideContainerItems}>
          <button
            disabled={disabledButtonCheck()}
            onMouseDown={() => handleBookSelection("new")}
            className={classes.item}
          >
            new +
          </button>
        </div>
        <div className={classes.rightSideContainerItems}>
          <form onSubmit={onSubmit}>
            <input
              disabled={disabledButtonCheck()}
              placeholder="search"
              type="search"
              ref={inputRef}
            />
          </form>
        </div>
        <div className={classes.rightSideContainerItems}>
          {user ? (
            <button
              className={classes.item}
              disabled={disabledButtonCheck()}
              onClick={isModalOpen ? null : () => signOut()}
            >
              Log Out
            </button>
          ) : (
            <button
              className={classes.item}
              disabled={isModalOpen && !user}
              onClick={isModalOpen ? null : () => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
