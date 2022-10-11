export default function Grabber({arrowAmount, isOpen}) {
    let grabArray = [];
    let grabStyleTop = { margin: "0px" };
    let grabStyleMiddle = { margin: "-6px" };
    let grabStyleBottom = { margin: "0px" };
    for (let i = 1; i < (arrowAmount + 1); i++) {
      if (i === 1) {
        grabArray.push(
          <p key={i} style={grabStyleTop}>
            {isOpen ? '<' : '>'}
          </p>
        );
      }
      if (i === arrowAmount) {
        grabArray.push(
          <p key={i} style={grabStyleBottom}>
            {isOpen ? '<' : '>'}
          </p>
        );
      }
      if (i !== arrowAmount && i !== 1) {
        grabArray.push(
          <p key={i} style={grabStyleMiddle}>
            {isOpen ? '<' : '>'}
          </p>
        );
      }
    }
    return grabArray;
}