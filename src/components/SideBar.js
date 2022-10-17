import { useState, useEffect } from "react";
import classes from "./SideBar.module.css";

export default function SideBar({
  itemNameArray,
  selectedItemName,
  sideBarPosition,
}) {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleItemNameArrayChange();
  }, [itemNameArray]);

  function handleItemNameArrayChange() {
    if (isOpen) {
      setIsOpen(false);
    }
    if (itemNameArray && itemNameArray.length > 0) {
      setTimeout(() => {
        setIsOpen(true);
      }, "200");
    }
  }

  function handleItemSelection(item) {
    setActiveItem(item);
    selectedItemName(item);
  }

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      } ${sideBarPosition === "left" ? classes.leftSideBarContainer : null}`}
    >
      <div className={classes.itemContainer}>
        {itemNameArray && isOpen
          ? itemNameArray.map((item, index) => {
              return (
                <button
                  onMouseDown={() => handleItemSelection(item)}
                  className={`${classes.item} ${
                    activeItem === item ? classes.active : null
                  }`}
                  key={index}
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
