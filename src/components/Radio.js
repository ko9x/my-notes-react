import './Radio.module.css';
import classes from './Radio.module.css';

export default function Radio({ nameArray, selectionFunction, selectedItem, isMobile }) {
  return (
    <div className={isMobile ? classes.smallContainer : classes.largeContainer}>
      {nameArray?.length > 0 &&
        nameArray.map((itemName, index) => (
          <div key={`${itemName}${index}`} className={classes.smallRadio}>
            <input onChange={(e) => selectionFunction(e)} type="radio" id={itemName} checked={itemName === selectedItem ? true : false} /><label>{itemName}</label>
          </div>
        ))}
    </div>
  );
}
