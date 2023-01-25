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
  export {
    createArrays,
  }
