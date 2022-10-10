import classes from "./Header.module.css";
import { useState } from "react";

export default function Header({ pageNames }) {
  const [isActive, setIsActive] = useState(null);

  return (
    <div className={classes.container}>
      <h1 className={classes.logo}>My Notes</h1>
      <div className={classes.itemContainer}>
        {pageNames.map((page, index) => {
          return (
            <button
              onMouseDown={() => setIsActive(index)}
              className={isActive === index ? classes.active : classes.item}
              key={index}
            >
              {page}
            </button>
          );
        })}
        <button
          onMouseDown={() => setIsActive("new")}
          onMouseUp={() => setIsActive(false)}
          className={isActive === "new" ? classes.active : classes.item}
        >
          new +
        </button>
        <input placeholder="search" />
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
