import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Spin as Hamburger } from "hamburger-react";
import { ReactComponent as LogoSvg } from "../images/logo-cropped.svg";
import { ReactComponent as SunSvg } from "../images/icons8-sun.svg";
import { ReactComponent as MoonSvg } from "../images/icons8-moon.svg";
import { ReactComponent as UserSvg } from "../images/icons8-user.svg";
import 'font-awesome/css/font-awesome.min.css';

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
  const [isDark, setIsDark] = useState(true);
  const [activeBook, setActiveBook] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [showSlide, setShowSlide] = useState(false);
  const inputRef = useRef();
  
  const fontColor = getComputedStyle(document.documentElement).getPropertyValue('--font-color');
  const actionColor = getComputedStyle(document.documentElement).getPropertyValue('--actionButton-color');

  if(isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if(!isDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

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
                marginLeft: isLandscape ? "10px" : "5px",
                marginRight: isLandscape ? "20px" : "10px",
                marginTop: isLandscape ? "5px" : "2px",
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
                  type="search"
                  placeholder="search"
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
          <h1 className={classes.logo} onClick={() => setIsDark(prevState => !prevState)}>
            <LogoSvg style={{ height: '90px', marginTop: '5px' }} color={actionColor} />
          </h1>
        </div>
        <div className={classes.searchContainer}>
          <form onSubmit={onSubmit} style={{width: '100%'}}>
            <input
              className={classes.largeSearchInput}
              disabled={disabledButtonCheck()}
              placeholder=' &#xF002;  search'
              style={{fontFamily: "Arial, FontAwesome", color: fontColor, paddingLeft: '20px', paddingRight: '10px', fontSize: 'large'}}
              type="search"
              ref={inputRef}
              id='largeSearchID'
            />
          </form>
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
          <button
              disabled={disabledButtonCheck()}
              onMouseDown={() => handleBookSelection("new")}
              className={classes.item}
            >
              new +
          </button>
          <button
              onMouseDown={() => setIsDark(prevState => !prevState)}
              className={classes.item}
            >
              {isDark ? <SunSvg color={fontColor} /> : <MoonSvg color={fontColor} /> }
          </button>
          <button
              onMouseDown={() => user ? signOut() : signIn()}
              className={classes.item}
              style={{paddingRight: '20px'}}
            >
              <UserSvg color={fontColor} />
          </button>
        </div>
        <div className={classes.rightSideContainer}>
        </div>
      </div>
    );
  }
}
