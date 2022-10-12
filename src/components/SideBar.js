import { useState } from "react";
import classes from "./SideBar.module.css";
import Grabber from "./Grabber";

export default function SideBar({itemName, selectedItemName, sideDisplayed}) {
  const [activePage, setActivePage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function handlePageSelection(page) {
    setActivePage(page);
    selectedItemName(page);
  }

  function grabberBar() {
    return (
      <div className={classes.grabberBar}>
        <div
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={classes.grabber}
        >
          <Grabber isOpen={isOpen} iconAmount={5} sideDisplayed={sideDisplayed} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      }`}
    >
      {sideDisplayed === 'left' && grabberBar()}
      <div className={`${classes.itemContainer} ${sideDisplayed === 'right' ? classes.itemContainerRight : null}`}>
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
        }) : null}
      </div>
      {sideDisplayed === 'right' && grabberBar()}
    </div>
  );
}
