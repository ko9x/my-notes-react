export default function NoteInput({
  selectedItem,
  newItem,
  handleSetNewItem,
  hasDuplicate,
  list,
  itemProperty,
  itemFunction,
  itemPropertyName,
  validationFunction
}) {
  function handleSetNewItemName(e) {
    if (e.target.value === "" || hasDuplicate(list, e.target.value)) {
      handleSetNewItem({ text: "setNameNull" }, itemProperty, itemFunction, itemPropertyName);
    } else {
      handleSetNewItem({ text: "hasValue", payload: e.target.value }, itemProperty, itemFunction, itemPropertyName);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder={selectedItem}
        onChange={(e) => handleSetNewItemName(e)}
      />
      <button
        style={{ marginLeft: "1.5vw" }}
        disabled={newItem.name === null}
        onClick={() => handleSetNewItem({ text: "confirm" }, itemProperty, itemFunction, itemPropertyName, validationFunction)}
      >
        Confirm
      </button>
      <button
        style={{ marginLeft: "1.5vw" }}
        onClick={() => handleSetNewItem({ text: "cancel" }, itemProperty, itemFunction, itemPropertyName)}
      >
        Cancel
      </button>
    </>
  );
}
