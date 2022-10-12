export default function Grabber({iconAmount, isOpen, sideDisplayed}) {

    const closeIcon = sideDisplayed === 'right' ? '<' : '>'
    const openIcon = sideDisplayed === 'right' ? '>' : '<'
    let grabArray = [];
    let grabStyleTop = { margin: "0px" };
    let grabStyleMiddle = { margin: "-6px" };
    let grabStyleBottom = { margin: "0px" };
    for (let i = 1; i < (iconAmount + 1); i++) {
      if (i === 1) {
        grabArray.push(
          <p key={i} style={grabStyleTop}>
            {isOpen ? openIcon : closeIcon}
          </p>
        );
      }
      if (i === iconAmount) {
        grabArray.push(
          <p key={i} style={grabStyleBottom}>
            {isOpen ? openIcon : closeIcon}
          </p>
        );
      }
      if (i !== iconAmount && i !== 1) {
        grabArray.push(
          <p key={i} style={grabStyleMiddle}>
            {isOpen ? openIcon : closeIcon}
          </p>
        );
      }
    }
    return grabArray;
}