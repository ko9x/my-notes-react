import classes from "./HelperButtons.module.css";

export default function HelperButtons({
  insertHelperText,
  selectedRef,
  helpers,
  isMobile
}) {
  const helpersArray = Object.values(helpers);
  function renderedItems() {
    return helpersArray.map((helper, index) => (
      <h2
        key={helper.id}
        className='courierButton'
        style={{paddingRight: isMobile ? '4vw' : null}}
        onClick={() => insertHelperText(selectedRef, helper)}
      >
        {helper.name}
      </h2>
    ));
  }

  return <div className={classes.buttonContainer} style={{overflowX: isMobile ? 'scroll' : null}}>{renderedItems()}</div>;
}
