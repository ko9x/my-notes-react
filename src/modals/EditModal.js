import Modal from "react-modal";
import classes from './EditModal.module.css'

const customStyles = {
  content: {
    height: "80vh",
    width: "70vw",
    position: "relative",
    zIndex: "200",
    marginLeft: '11vw',
    marginTop: '8vh',
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
            <h2>Content</h2>
            <textarea className={classes.modalTextArea}>{noteToEdit?.content}</textarea>
            <h3>Side Note</h3>
            <input
              type="text"
              value={noteToEdit?.side ? noteToEdit.side : null}
              className={classes.modalInput}
            />
            <h3>Important Note</h3>
            <input
              type="text"
              value={noteToEdit?.important ? noteToEdit.important : null}
              className={classes.modalInput}
            />
          </form>
        </div>
        <div className={classes.closeButtonContainer}>
          <button className={classes.closeButton} onClick={closeModal}>close</button>
        </div>
      </div>
    </Modal>
  );
}
