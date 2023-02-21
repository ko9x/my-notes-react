import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";

export default function Header({
  bookNames,
  pageNames,
  sectionNames,
  selectedBook,
  selectedPage,
  selectedSection,
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

  function createOptionsArray(name, list) {
    const arrWithName = [{value: name, label: name}];
    list.forEach((item) => {
      arrWithName.push({value: item, label: item});
    });
    return arrWithName;
  }

  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderColor: 'black'
    })
  };

  if (width < 750) {
    return (
      <div className={classes.smallContainer}>
        <div className={classes.smallLogoContainer}>
          <h1 className={classes.smallLogo}>
            {displayName ? `${displayName}'s Notes` : "My Notes"}
          </h1>
        </div>
        <div className={classes.smallBookContainerTop}>
          <Select
            styles={selectStyles}
            components={{
              IndicatorSeparator: () => null,
              IndicatorsContainer: () => null
            }}
            options={createOptionsArray("books", bookNames)}
            onChange={(e) => handleBookSelection(e.value)}
            placeholder={"book"}
          />
          <Select
            styles={selectStyles}
            isDisabled={pageNames.length < 1}
            options={createOptionsArray("pages", pageNames)}
            onChange={(e) => selectedPage(e.value)}
            placeholder={"page"}
          />
          <Select
            styles={selectStyles}
            isDisabled={sectionNames.length < 1}
            options={createOptionsArray("sections", sectionNames)}
            onChange={(e) => selectedSection(e.value)}
            placeholder={"section"}
          />
        </div>
        <div className={classes.smallBookContainerBottom}>
          <button
            disabled={disabledButtonCheck()}
            onMouseDown={() => handleBookSelection("new")}
            className={classes.smallNewButton}
          >
            new | +
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
}
