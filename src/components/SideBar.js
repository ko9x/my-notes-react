import { useState, useEffect } from "react";
import classes from "./SideBar.module.css";
import Grabber from "./Grabber";

export default function SideBar({itemName, selectedItemName, sideDisplayed}) {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleItemNameChange()
  }, [itemName])

  function handleItemNameChange() {
    if(isOpen) {
      setIsOpen(false);
    } 
    if (itemName && itemName.length > 0) {
      setTimeout(() => {
        setIsOpen(true);
      }, '200')
    }
  }


  function handleItemSelection(item) {
    setActiveItem(item);
    if(selectedItemName) {
      selectedItemName(item);
    }
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
      {itemName && isOpen ? itemName.map((item, index) => {
          return (
            <button
              onMouseDown={() => handleItemSelection(item)}
              className={`${classes.item} ${activeItem === item ? classes.active : null}`}
              key={index}
            >
              {item}
            </button>
          )
        }) : null}
      </div>
      {sideDisplayed === 'right' && grabberBar()}
    </div>
  );
}
