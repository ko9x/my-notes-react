import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Spin as Hamburger } from "hamburger-react";
import { ReactComponent as LogoSvg } from "../images/logo-cropped.svg";

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
  isLandscape,
}) {
  const [activeBook, setActiveBook] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [showSlide, setShowSlide] = useState(false);
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
    const arrWithName = [{ value: name, label: name }];
    list.forEach((item) => {
      arrWithName.push({ value: item, label: item });
    });
    return arrWithName;
  }

  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderColor: "black",
      width: "98vw",
      height: '40px',
      boxShadow: '1px 10px 10px rgba(0,0,0,0.4)',
      marginTop: '2px'
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      paddingRight: "3px",
      paddingLeft: "0",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'black'
    }),
  };

  const componentOptions = {
    IndicatorSeparator: () => null,
  };

  if (isMobile) {
    return (
      <div>
        <div
          className={classes.smallContainer}
          style={{ height: isLandscape ? "40vh" : "10vh" }}
        >
          <div style={{ flex: "1" }} onClick={() => setShowSlide(prevState => !prevState)}>
            <LogoSvg
              style={{
                marginLeft: isLandscape ? "3vw" : "2vw",
                marginRight: isLandscape ? "3vw" : "2vw",
                marginTop: isLandscape ? "1vh" : ".5vh",
              }}
            />
          </div>
          <div style={{ flex: "3", height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
              }}
            >
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <input
                  style={{ width: "90%", height: isLandscape ? "35%" : "50%" }}
                  className={classes.smallInput}
                  disabled={disabledButtonCheck()}
                  placeholder="search"
                  type="search"
                  ref={inputRef}
                />
              </form>
            </div>
          </div>
          <div style={{ marginRight: "1vw" }}>
            <Hamburger toggled={showSlide} onToggle={() => {
              setShowSlide(prevState => !prevState);
            }} rounded duration={.7} />
          </div>
        </div>
        <div className={`${classes.slideContainer} ${showSlide ? classes.slideOpen : classes.slideClosed}`}>
          <div className={classes.itemContainer}>
              <Select
                styles={selectStyles}
                components={componentOptions}
                options={createOptionsArray("books", bookNames)}
                onChange={(e) => handleBookSelection(e.value)}
                placeholder={"select a book"}
              />
              <Select
                styles={selectStyles}
                components={componentOptions}
                isDisabled={pageNames.length < 1}
                options={createOptionsArray("pages", pageNames)}
                onChange={(e) => selectedPage(e.value)}
                placeholder={"select a page"}
              />
              <Select
                styles={selectStyles}
                components={componentOptions}
                isDisabled={sectionNames.length < 1}
                options={createOptionsArray("sections", sectionNames)}
                onChange={(e) => selectedSection(e.value)}
                placeholder={"select a section"}
              />
              <button
                onMouseDown={() => handleBookSelection("new")}
                className={classes.smallNewButton}
              >
                add a new note
              </button>
              <button
                disabled={disabledButtonCheck()}
                onMouseDown={() => signOut()}
                className={classes.smallNewButton}
              >
                {`logout ${displayName}` }
              </button>
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
            <LogoSvg style={{ height: '90px', marginTop: '5px' }} />
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
                <div>
                  <p style={{marginTop: '0', marginBottom: '0'}} >logout</p>
                  <p style={{marginTop: '0', marginBottom: '0'}} >{displayName}</p>
                </div>
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
