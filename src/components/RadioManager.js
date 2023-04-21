import classes from "./RadioManager.module.css";
import NoteInput from "./NoteInput";
import Radio from "./Radio";

function hasDuplicate(myArr, item) {
  if (!myArr) {
    return false;
  } else {
    const newArr = myArr.find((arrItem) => arrItem === item);
    return Boolean(newArr);
  }
}

export default function RadioManager({
  missingItem,
  newItem,
  selectedProperty,
  handleSetNewItem,
  itemList,
  setNewItem,
  itemPropertyName,
  setMissingItem,
  determineSelectedItem,
  noteToEdit,
  handleItemChange,
  determinePropertyNameArray,
  isMobile,
  pulse
}) {
  return (
    <div className={classes.radioContainer}>
      <div>
        <h2 className={missingItem ? classes.validationWarning : null}>
          {itemList.length > 0 ? 'Select a ' : 'Create a '} {itemPropertyName}
        </h2>
        <button
          disabled={!setNewItem}
          onClick={() => setNewItem({ ...newItem, changing: true })}
          className={`courierButton ${pulse ? classes.pulseButton : null}`}
        >
          new +
        </button>
      </div>
      <div>
        {newItem.changing ? (
          <NoteInput
            selectedItem={newItem.name ? newItem.name : selectedProperty}
            newItem={newItem}
            handleSetNewItem={handleSetNewItem}
            hasDuplicate={hasDuplicate}
            list={itemList}
            itemProperty={newItem}
            itemFunction={setNewItem}
            itemPropertyName={itemPropertyName}
            validationFunction={setMissingItem}
          />
        ) : (
          <div>
            <Radio
              nameArray={determinePropertyNameArray()}
              selectedItem={determineSelectedItem(
                newItem,
                selectedProperty,
                noteToEdit?.[itemPropertyName]
              )}
              selectionFunction={handleItemChange}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
}
