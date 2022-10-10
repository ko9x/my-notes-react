import classes from "./Header.module.css";
import { useState } from "react";

export default function Header({ bookNames, selectedBook }) {
  const [activeBook, setActiveBook] = useState(null);

  selectedBook(activeBook);

  return (
    <div className={classes.container}>
      <h1 className={classes.logo}>My Notes</h1>
      <div className={classes.itemContainer}>
        {bookNames.map((book, index) => {
          return (
            <button
              onMouseDown={() => setActiveBook(book)}
              className={activeBook === book ? classes.active : classes.item}
              key={index}
            >
              {book}
            </button>
          );
        })}
        <button
          onMouseDown={() => setActiveBook("new")}
          onMouseUp={() => setActiveBook(null)}
          className={activeBook === "new" ? classes.active : classes.item}
        >
          new +
        </button>
        <input placeholder="search" />
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
