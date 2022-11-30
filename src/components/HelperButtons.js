import classes from "./HelperButtons.module.css";

export default function HelperButtons({
  insertHelperText,
  selectedRef,
  helpers,
}) {
  return (
    <div className={classes.buttonContainer}>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.codeWrap)}
        className={classes.courierButton}
      >
        code-wrap
      </h2>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.pTag)}
        className={classes.courierButton}
      >
        p-tag
      </h2>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.lineBreak)}
        className={classes.courierButton}
      >
        line-break
      </h2>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.nonBreakingSpace)}
        className={classes.courierButton}
      >
        non-breaking-space
      </h2>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.listItem)}
        className={classes.courierButton}
      >
        list-item
      </h2>
      <h2
        onClick={() => insertHelperText(selectedRef, helpers.openCaret)}
        className={classes.courierButton}
      >
        {"<"}
      </h2>
    </div>
  );
}
