import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

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
  isMobile,
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
      borderColor: 'black',
      width: '30vw'
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      paddingRight: '3px',
      paddingLeft: '0'
    })
  };

  const componentOptions = {
    IndicatorSeparator: () => null
  };

  if (isMobile) {
    return (
      <div className={classes.smallContainer}>
        <div className={classes.smallLogoContainer}>
          <h1 className={classes.smallLogo}>
            {displayName ? `${displayName}'s Notes` : "My Notes"}
          </h1>
        </div>
        <div className={classes.smallBookContainerTop}>
          <div style={{display: 'flex', flex: '1'}}>
            <Select
              styles={selectStyles}
              components={componentOptions}
              options={createOptionsArray("books", bookNames)}
              onChange={(e) => handleBookSelection(e.value)}
              placeholder={"book"}
            />
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <Select
              styles={selectStyles}
              components={componentOptions}
              isDisabled={pageNames.length < 1}
              options={createOptionsArray("pages", pageNames)}
              onChange={(e) => selectedPage(e.value)}
              placeholder={"page"}
            />
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <Select
              styles={selectStyles}
              components={componentOptions}
              isDisabled={sectionNames.length < 1}
              options={createOptionsArray("sections", sectionNames)}
              onChange={(e) => selectedSection(e.value)}
              placeholder={"section"}
            />
          </div>
        </div>
        <div className={classes.smallBookContainerBottom}>
          <button
            disabled={disabledButtonCheck()}
            onMouseDown={() => handleBookSelection("new")}
            className={classes.smallNewButton}
          >
            new note
          </button>
          <div style={{ display: 'flex', marginLeft: 'auto'}}>
          <form onSubmit={onSubmit} >
            <input
              className={classes.smallInput}
              disabled={disabledButtonCheck()}
              placeholder="search"
              type="search"
              ref={inputRef}
            />
          </form>
          <FaSearch onClick={(e) => onSubmit(e)} style={{alignSelf: 'center', paddingLeft: '1vw'}} />
          </div>
        </div>
      </div>
    );
  }

  if (!isMobile) {
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
