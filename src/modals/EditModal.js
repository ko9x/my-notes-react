import Modal from "react-modal";
import classes from "./EditModal.module.css";
import { useState } from "react";

const customStyles = {
  content: {
    height: "80vh",
    width: "70vw",
    position: "relative",
    zIndex: "200",
    marginLeft: "11vw",
    marginTop: "8vh",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "grey",
  },
};

export default function EditModal({
  isModalOpen,
  closeModal,
  noteToEdit,
  bookList,
  pageList,
  sectionList,
}) {
  const [contentSize, setContentSize] = useState("medium");
  const [sideSize, setSideSize] = useState(null);
  const [importantSize, setImportantSize] = useState(null);

  // @TODO I'm sure there is a better way to refactor this
  function toggleContentSize() {
    if (contentSize === "large") {
      setContentSize("medium");
    } else {
      setContentSize("large");
    }
  }
  function toggleSideSize() {
    if (sideSize === null) {
      setSideSize("medium");
    } else {
      setSideSize(null);
    }
  }
  function toggleImportantSize() {
    if (importantSize === null) {
      setImportantSize("medium");
    } else {
      setImportantSize(null);
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <div>
          <h2>Select a Book</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {bookList.length > 0 &&
              bookList.map((book) => (
                <div>
                  <input type="radio" /> <label>{book}</label>
                </div>
              ))}
            <div>
              <input type="radio" /> <label>new +</label>
            </div>
          </div>
          <form>
            <h2>Title</h2>
            <input
              type="text"
              value={noteToEdit?.title}
              className={classes.modalInput}
            />
            <h2 onClick={() => toggleContentSize()}>Content</h2>
            <textarea
              className={`${classes.modalTextArea} ${
                contentSize === "large"
                  ? classes.modalTextAreaLargeHeight
                  : classes.modalTextAreaMediumHeight
              }`}
            >
              {noteToEdit?.content}
            </textarea>
            <h3 onClick={() => toggleSideSize()}>Side Note</h3>
            <textarea
              placeholder={noteToEdit?.side ? null : 'Add a side note'}
              className={`${classes.modalTextArea} ${
                sideSize === "medium" ? classes.modalTextAreaMediumHeight : null
              }`}
            >
              {noteToEdit?.side}
            </textarea>
            <h3 onClick={() => toggleImportantSize()}>Important Note</h3>
            <textarea
              placeholder={noteToEdit?.side ? null : 'Add an important note'}
              className={`${classes.modalTextArea} ${
                importantSize === "medium"
                  ? classes.modalTextAreaMediumHeight
                  : null
              }`}
            >
              {noteToEdit?.important}
            </textarea>
          </form>
        </div>
        <div className={classes.closeButtonContainer}>
          <button className={classes.closeButton} onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </Modal>
  );
}
