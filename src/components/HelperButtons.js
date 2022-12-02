import classes from "./HelperButtons.module.css";

export default function HelperButtons({
  insertHelperText,
  selectedRef,
  helpers,
}) {
  const helpersArray = Object.values(helpers);
  function renderedItems() {
    return helpersArray.map((helper, index) => (
      <h2
        key={helper.id}
        className='courierButton'
        onClick={() => insertHelperText(selectedRef, helper)}
      >
        {helper.name}
      </h2>
    ));
  }

  return <div className={classes.buttonContainer}>{renderedItems()}</div>;
}
