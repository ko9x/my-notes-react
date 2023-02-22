import classes from "./Footer.module.css";

export default function Footer({isMobile, user, signOut}) {
  return (
    <div className={classes.container}>
      <div className={classes.footerTextContainer}>
        <p className={classes.footerText}>MyNotes 2022</p>
        {(isMobile && user) && <button onClick={() => signOut()} className={classes.logout}>logout</button>}
      </div>
    </div>
  );
}
