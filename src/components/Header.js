import classes from "./Header.module.css";

export default function Header({ pageNames }) {
  function ShowBooks() {
    if (pageNames.length > 0) {
      return pageNames.map((page, index) => (
        <button className={classes.item} key={index}>
          {page}
        </button>
      ));
    }
    if (pageNames.length < 0) {
      return <div style={{ color: "white" }}>No Pages</div>;
    }
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.logo}>My Notes</h1>
      <div className={classes.itemContainer}>
        <ShowBooks />
        <button className={classes.item} >new +</button>
        <input placeholder="search" />
      </div>
      <h3 className={classes.logOut}>Log Out</h3>
    </div>
  );
}
