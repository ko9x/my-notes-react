export default function Grabber() {
    let grabArray = [];
    let grabStyleTop = { margin: "0px" };
    let grabStyleMiddle = { margin: "-6px" };
    let grabStyleBottom = { margin: "0px" };
    for (let i = 1; i < 5; i++) {
      if (i === 1) {
        grabArray.push(
          <p key={i} style={grabStyleTop}>
            {" "}
            >{" "}
          </p>
        );
      }
      if (i === 4) {
        grabArray.push(
          <p key={i} style={grabStyleBottom}>
            {" "}
            >{" "}
          </p>
        );
      }
      if (i !== 4 && i !== 1) {
        grabArray.push(
          <p key={i} style={grabStyleMiddle}>
            {" "}
            >{" "}
          </p>
        );
      }
    }
    return grabArray;
}