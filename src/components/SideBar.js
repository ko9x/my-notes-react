import { useState } from "react";
import classes from "./SideBar.module.css";
import Grabber from "./Grabber";

export default function SideBar({itemName, selectedItemName}) {
  const [activePage, setActivePage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function handlePageSelection(page) {
    setActivePage(page);
    selectedItemName(page);
  }

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      }`}
    >
      <div className={classes.itemContainer}>
      {itemName && isOpen ? itemName.map((page, index) => {
          return (
            <button
              onMouseDown={() => handlePageSelection(page)}
              className={`${classes.item} ${activePage === page ? classes.active : null}`}
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
