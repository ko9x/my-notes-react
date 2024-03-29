function createArrays(
    myArr,
    setBooksNamesFunction?,
    selectedBook?,
    setPageNamesFunction?,
    selectedPage?,
    setSectionNamesFunction?,
    setSelectedNotesFunction?,
    selectedSection?,
    setSelectedSectionFunction?,
  ) {
    const bookArr = [];
    const pageArr = [];
    const sectionArr = [];
    const allSectionsArray = [];
    const singleSectionArr = [];
    for (const key in myArr) {
      const note = myArr[key];
      const book = note.book
      if(!bookArr.includes(book)) {
        bookArr.push(book);
      }
      if (myArr[key].book === selectedBook) {
        const page = note.page;
        if(!pageArr.includes(page)) {
          pageArr.push(page);
        }
        if (myArr[key].page === selectedPage) {
          const section = note.section;
          allSectionsArray.push(note);
          if(!sectionArr.includes(section)) {
            sectionArr.push(section);
          }
          if (myArr[key].section === selectedSection) {
            singleSectionArr.push(note);
          }
        }
      }
    }
    if ((myArr) && (!selectedBook && !selectedPage && !selectedSection)) {
      setBooksNamesFunction(bookArr);
    }
    if ((myArr && selectedBook) && (!selectedPage && !selectedSection)) {
      setPageNamesFunction(pageArr);
    }
    if ((myArr && selectedBook && selectedPage) && (!selectedSection)) {
      setSectionNamesFunction(sectionArr);
      setSelectedNotesFunction(allSectionsArray);
    }
  }

  const helpers = {
    codeWrap: {id: 1, name: 'codeWrap', code: '<pre><code></code></pre>'},
    pTag: {id: 2, name: 'pTag', code: '<p></p>'},
    aTag: {id: 3, name: 'aTag', code: '<a href="" target="_blank">here<a/>'},
    lineBreak: {id: 4, name: 'lineBreak', code: '<br>'},
    nonBreakingSpace: {id: 5, name: 'nonBreakingSpace', code: ' &nbsp '},
    listItem: {id: 6, name: 'listItem', code: '<li></li>'},
  }

  function setCursorPosition(cursorPosition, selectedRef, helper) {
    if(helper === helpers.aTag) {
      return selectedRef.current.selectionEnd = cursorPosition + 9;
    }
    if(helper === helpers.pTag) {
      return selectedRef.current.selectionEnd = cursorPosition + 3;
    }
    if(helper === helpers.codeWrap) {
      return selectedRef.current.selectionEnd = cursorPosition + 11;
    }
    if(helper === helpers.nonBreakingSpace) {
      return selectedRef.current.selectionEnd = cursorPosition + 7;
    }
    if(helper === helpers.listItem || helpers.lineBreak) {
      return selectedRef.current.selectionEnd = cursorPosition + 4;
    }
  }

  function insertHelperText(selectedRef, helper) {
    let currentValue = selectedRef.current.value;
    let cursorPosition = selectedRef.current.selectionStart;
    let valueBeforeCursor = selectedRef.current.value.substring(0, cursorPosition);
    let valueAfterCursor = selectedRef.current.value.substring(cursorPosition, currentValue.length);
    selectedRef.current.value = valueBeforeCursor + helper.code + valueAfterCursor;
    selectedRef.current.focus();
    setCursorPosition(cursorPosition, selectedRef, helper);
  }

  function fixCaret(noteText) {
    let arr = noteText.split('<pre><code>').map(el => el.split('</code></pre>')).reduce((acc, curr) => acc.concat(curr))
    let newArr = arr.map((section, index) => {
      if(index % 2 !== 0) {
        let newPart = section.split('<').join('&#60');
        return `<pre><code>${newPart}</code></pre>`;
      } else {
        return section;
      }
    });
    return newArr.join('');
  }

  function toggleFunc(setStateFunc, toggleState) {
    setStateFunc(prevState => !prevState);
  }

  function handleToggleAndText(setStateFunc, toggleState, isMobile) {
    function showText() {
      if(toggleState) {
        return ' collapse'
      } else {
        return ' expand'
      }
    }
    return (
      <p onClick={() => toggleFunc(setStateFunc, toggleState)} style={{ fontSize: "small", marginTop: "0px", cursor: 'pointer' }}
                >{isMobile ? `(tap to${showText()})` : `(click to${showText()})`}</p>
    )
  }

  export {
    createArrays,
    fixCaret,
    insertHelperText,
    toggleFunc,
    handleToggleAndText,
    helpers
  }
