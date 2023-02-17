import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Dropdown from "react-dropdown";
import "../customStyles/styles.css";

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
  width,
  height,
}) {
  const [activeBook, setActiveBook] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    setActiveBook(defaultBook);
  }, [defaultBook]);

  useEffect(() => {
    setDisplayName(newDisplayName);
  }, [newDisplayName]);

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

  if (width > 750) {
    return (
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <h1 className={classes.logo}>
            {displayName ? `${displayName}'s Notes` : "My Notes"}
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

  if (width < 750) {
    return (
      <div className={classes.smallContainer}>
        <div className={classes.smallLogoContainer}>
          <h1 className={classes.smallLogo}>
            {displayName ? `${displayName}'s Notes` : "My Notes"}
          </h1>
        </div>
        <div className={classes.smallBookContainerTop}>
          <Dropdown options={["books", "1", "2", "3"]} placeholder={"book"} />
          <Dropdown options={["pages", "1", "2", "3"]} placeholder={"page"} />
          <Dropdown options={["section", "1", "2", "3"]} placeholder={"section"}
          />
        </div>
        <div className={classes.smallBookContainerBottom}>
          <button
              disabled={disabledButtonCheck()}
              onMouseDown={() => handleBookSelection("new")}
              className={classes.smallNewButton}
            >
              new +
            </button>
          <form onSubmit={onSubmit}>
              <input
                className={classes.smallInput}
                disabled={disabledButtonCheck()}
                placeholder="search"
                type="search"
                ref={inputRef}
              />
            </form>
        </div>
      </div>
    );
  }
}
