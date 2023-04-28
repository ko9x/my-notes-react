import classes from "./Header.module.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Spin as Hamburger } from "hamburger-react";
import { ReactComponent as LogoSvg } from "../images/logo-cropped.svg";
import { ReactComponent as SunSvg } from "../images/icons8-sun.svg";
import { ReactComponent as MoonSvg } from "../images/icons8-moon.svg";
import { ReactComponent as UserSvg } from "../images/icons8-user.svg";
import { ReactComponent as SearchSvg } from "../images/search-icon.svg";
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
  isDemoMode,
  signOut,
  newDisplayName,
  isMobile,
  isLandscape,
  isDark,
  setIsDark,
  textColor,
  actionColor,
  setIsLoading,
  setPhysicalSectionClick,
  newUser,
  enableDemoMode,
  disableDemoMode
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

  useEffect(() => {
    if((newUser && isMobile) || (isDemoMode && isMobile)) {
      setTimeout(() => {
        setShowSlide(true);
      }, 500)
    }
  }, [newUser, isMobile]);

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
    setIsLoading(true);
    setTimeout(() => {
      searchItem(value);
    }, 100)
    inputRef.current.value = "";
    handleBookSelection(null);
  }

  function disabledButtonCheck() {
    if (isModalOpen) {
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

  function handleSelectedSection(section) {
    setPhysicalSectionClick(true);
    selectedSection(section)
  }

  const selectStyles = {
    control: (baseStyles, {isDisabled}) => ({
      ...baseStyles,
      borderColor: "black",
      width: "98vw",
      height: '40px',
      marginTop: '2px',
      backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.85)' : 'white'
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      paddingRight: "3px",
      paddingLeft: "0",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'black'
    })
  };

  const componentOptions = {
    IndicatorSeparator: () => null,
  };

  function handleShowSlide() {
    if(showSlide) {
      if(newUser) {
        return classes.slideOpenNewUser;
      }
      if(isDemoMode) {
        return classes.slideOpenDemoMode;
      }
      if(!newUser && !isDemoMode) {
        return classes.slideOpen;
      }
    } else {
      return classes.slideClosed;
    }
  }

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
              color={actionColor}
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
            <Hamburger toggled={showSlide} color={textColor} onToggle={() => {
              setShowSlide(prevState => !prevState);
            }} rounded duration={.7} />
          </div>
        </div>
        <div className={`${classes.slideContainer} ${handleShowSlide()}`}>
          <div className={classes.itemContainer}>
              <Select
                styles={selectStyles}
                components={componentOptions}
                options={createOptionsArray("select a book", bookNames)}
                onChange={(e) => handleBookSelection(e.value)}
                placeholder={"select a book"}
              />
              <Select
                styles={selectStyles}
                components={componentOptions}
                isDisabled={pageNames.length < 1}
                options={createOptionsArray("select a page", pageNames)}
                onChange={(e) => selectedPage(e.value)}
                placeholder={"select a page"}
              />
              <Select
                styles={selectStyles}
                components={componentOptions}
                isDisabled={sectionNames.length < 1}
                options={createOptionsArray("select a section?", sectionNames)}
                onChange={(e) => handleSelectedSection(e.value)}
                placeholder={"select a section (optional)"}
              />
              {!isDemoMode && <><button
                onMouseDown={() => handleBookSelection("new")}
                className={classes.smallNewButton}
              >
                add a new note
              </button>
              <button
                onMouseDown={() => enableDemoMode()}
                className={classes.smallNewButton}
              >
                try demo mode
              </button>
              <button
                disabled={disabledButtonCheck()}
                onMouseDown={() => signOut()}
                className={classes.smallNewButton}
              >
                {`logout ${displayName}` }
              </button></>}
              {isDemoMode && <button
                onMouseDown={() => disableDemoMode()}
                className={classes.smallNewButton}
              >
                exit demo mode
              </button>}
            </div>
        </div>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <>
      {isDemoMode && <div className={classes.demoBanner}>hello</div>}
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <h1 className={classes.logo} onClick={() => setIsDark(prevState => !prevState)}>
            <LogoSvg style={{ minWidth: '120px', height: '90px', marginTop: '5px', paddingRight: '20px' }} color={actionColor} />
          </h1>
        </div>
        <div className={classes.searchContainer}>
          <form onSubmit={onSubmit} style={{width: '100%'}}>
            <SearchSvg style={{marginLeft: '-20px', marginRight: '-18px', marginBottom: '-2px', }} />
            <input
              className={classes.largeSearchInput}
              disabled={disabledButtonCheck()}
              placeholder='search'
              style={{fontFamily: "Arial, FontAwesome", color: textColor, paddingLeft: '20px', paddingRight: '10px', fontSize: 'large'}}
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
          {!isDemoMode && <button
              disabled={disabledButtonCheck()}
              onMouseDown={() => handleBookSelection("new")}
              className={classes.item}
            >
              new +
          </button>}
          <button
              onMouseDown={() => setIsDark(prevState => !prevState)}
              className={classes.item}
            >
              {isDark ? <SunSvg height={'23px'} color={textColor} /> : <MoonSvg height={'20px'} color={textColor} /> }
          </button>
          {!isDemoMode && <button
              onMouseDown={() => signOut()}
              className={classes.item}
              style={{marginRight: '10px'}}
            >
              <UserSvg height={'25px'} color={textColor} />
          </button>}
        </div>
        <div className={classes.rightSideContainer}>
        </div>
      </div>
      </>
    );
  }
}
