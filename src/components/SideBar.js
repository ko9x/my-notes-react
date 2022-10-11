import { useState } from "react";
import classes from "./SideBar.module.css";
import Grabber from "./Grabber";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.open : classes.closed
      }`}
    >
      <div className={classes.grabberBar}>
        <div
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={classes.grabber}
        >
          <Grabber />
        </div>
      </div>
    </div>
  );
}
