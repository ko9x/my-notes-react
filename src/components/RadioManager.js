import classes from './RadioManager.module.css';
import NoteInput from './NoteInput';
import Radio from './Radio';

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
}) {
    return (
        <>
        <div className={classes.radioTitle}>
            <h2 className={missingItem ? classes.validationWarning : null}>Select a {itemPropertyName}</h2>
            <button
              onClick={() => setNewItem({ ...newItem, changing: true })}
              className={classes.courierButton}
            >
              new +
            </button>
          </div>
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
            <Radio
              nameArray={determinePropertyNameArray()}
              selectedItem={determineSelectedItem(
                newItem,
                selectedProperty,
                noteToEdit?.[itemPropertyName]
              )}
              selectionFunction={handleItemChange}
            />
          )}
        </>
    )
}