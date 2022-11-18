export default function NoteInput({
  selectedItem,
  newItem,
  handleSetNewItem,
  hasDuplicate,
  list,
}) {
  function handleSetNewItemName(e) {
    if (e.target.value === "" || hasDuplicate(list, e.target.value)) {
      handleSetNewItem({ text: "setNameNull" });
    } else {
      handleSetNewItem({ text: "hasValue", payload: e.target.value });
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
        onClick={() => handleSetNewItem({ text: "confirm" })}
      >
        Confirm
      </button>
      <button
        style={{ marginLeft: "1.5vw" }}
        onClick={() => handleSetNewItem({ text: "cancel" })}
      >
        Cancel
      </button>
    </>
  );
}
