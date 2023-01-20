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
  user,
  signIn,
  signOut,
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
      <div style={{ display: "flex", flex: 1 }}>
        <h1 className={classes.logo}>
          {user ? `${user?.displayName}'s Notes` : "My Notes"}
        </h1>
      </div>
      <div className={classes.itemContainer}>
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ alignSelf: "center", paddingRight: "1vw" }}>
          <button
            disabled={disabledButtonCheck()}
            onMouseDown={() => handleBookSelection("new")}
            className={classes.item}
          >
            new +
          </button>
        </div>
        <div style={{ alignSelf: "center", paddingRight: "1vw" }}>
          <form onSubmit={onSubmit}>
            <input
              disabled={disabledButtonCheck()}
              placeholder="search"
              type="search"
              ref={inputRef}
            />
          </form>
        </div>
        <div style={{ alignSelf: "center", paddingRight: "1vw" }}>
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
