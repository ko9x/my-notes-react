import { useState } from "react";
import classes from "./SideBar.module.css";
import Grabber from "./Grabber";

export default function SideBar({pageNames}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      }`}
    >
      <div className={classes.itemContainer}>
      {pageNames && isOpen ? pageNames.map((page, index) => {
          return (
            <button
            //   onMouseDown={() => handleBookSelection(book)}
              className={classes.item}
              key={index}
            >
              {page}
            </button>
          )
        }) : <p></p>}
      </div>
      <div className={classes.grabberBar}>
        <div
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={classes.grabber}
        >
          <Grabber isOpen={isOpen} arrowAmount={4} />
        </div>
      </div>
    </div>
  );
}
