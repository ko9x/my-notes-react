import classes from "./Footer.module.css";

export default function Footer({isMobile}) {
  return (
    <div className={`${classes.container} ${isMobile ? classes.mobileBoxShadow : classes.largeBoxShadow}`}>
      <div className={classes.footerTextContainer}>
        <p className={classes.footerText}>My Notes 2023</p>
      </div>
    </div>
  );
}
