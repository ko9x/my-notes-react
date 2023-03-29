import classes from "./NoteInput.module.css";

export default function NoteInput({
  selectedItem,
  newItem,
  handleSetNewItem,
  hasDuplicate,
  list,
  itemProperty,
  itemFunction,
  itemPropertyName,
  validationFunction,
}) {
  function handleSetNewItemName(e) {
    if (e.target.value === "" || hasDuplicate(list, e.target.value)) {
      handleSetNewItem(
        { text: "setNameNull" },
        itemProperty,
        itemFunction,
        itemPropertyName
      );
    } else {
      handleSetNewItem(
        { text: "hasValue", payload: e.target.value },
        itemProperty,
        itemFunction,
        itemPropertyName
      );
    }
  }

  return (
    <div className={classes.noteInputContainer}>
      <input
        type="text"
        placeholder={selectedItem}
        onChange={(e) => handleSetNewItemName(e)}
      />
      <div className={classes.buttonContainer}>
        <button
          className={`${classes.inputButtons} ${classes.confirmButton}`}
          disabled={newItem.name === null}
          onClick={() =>
            handleSetNewItem(
              { text: "confirm" },
              itemProperty,
              itemFunction,
              itemPropertyName,
              validationFunction
            )
          }
        >
          Confirm
        </button>
        <button
          className={`${classes.inputButtons} ${classes.cancelButton}`}
          onClick={() =>
            handleSetNewItem(
              { text: "cancel" },
              itemProperty,
              itemFunction,
              itemPropertyName
            )
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
