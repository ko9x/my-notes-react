export default function Radio({ nameArray, selectionFunction, selectedItem }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {nameArray?.length > 0 &&
        nameArray.map((itemName, index) => (
          <div key={`${itemName}${index}`}>
            <input onChange={(e) => selectionFunction(e)} type="radio" id={itemName} checked={itemName === selectedItem ? true : false} /> <label>{itemName}</label>
          </div>
        ))}
    </div>
  );
}
