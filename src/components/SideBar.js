import { useState, useEffect } from "react";
import classes from "./SideBar.module.css";

export default function SideBar({
  itemNameArray,
  selectedItemName,
  sideBarPosition,
  defaultItem,
}) {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if(sideBarPosition === 'right') {
      if(itemNameArray && itemNameArray.length > 0) {
        handleItemSelection(itemNameArray[0]);
      }
    }
    handleItemNameArrayChange();
  }, [itemNameArray]);
  
  useEffect(() => {
    setActiveItem(defaultItem);
  }, [defaultItem]);

  useEffect(() => {
    if(isOpen) {
      setActiveItem(defaultItem)
    }
  }, [isOpen, defaultItem])

  function handleItemNameArrayChange() {
    if (isOpen) {
      setIsOpen(false);
      setActiveItem(null);
    }
    if (!isOpen && itemNameArray && itemNameArray.length > 0) {
      setCurrentItems(itemNameArray);
      setIsOpen(true);
    }
  }

  // @TODO this is kind of clunky. We should have an ID or something to verify the array has changed
  function handleTransitionEnd() {
    if(itemNameArray) {
      if(itemNameArray[0] !== currentItems[0]) {
        handleItemNameArrayChange();
      }
      if (itemNameArray.length !== currentItems.length) {
        handleItemNameArrayChange();
      }
    }
  }

  function handleItemSelection(item) {
    setActiveItem(item);
    selectedItemName(item);
  }

  return (
    <div
      onTransitionEnd={e => {
        handleTransitionEnd();
      }}
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      } ${sideBarPosition === "left" ? classes.leftSideBarContainer : null}`}
    >
      <div className={classes.itemContainer}>
        {currentItems ? currentItems.map((item, index) => {
              return (
                <button
                  onMouseDown={() => handleItemSelection(item)}
                  className={`${classes.item} ${
                    activeItem === item ? classes.active : null
                  }`}
                  key={index}
                  style={{marginRight: sideBarPosition === "left" ? '65px' : null}}
                >
                  {item}
                </button>
              );
            })
          : null}
      </div>
    </div>
  );
}
