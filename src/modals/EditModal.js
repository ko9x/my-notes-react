import Modal from "react-modal";

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
      <div style={{ display: "flex", flexDirection: "column" }}>
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
              style={{ width: "95%", borderRadius: "5px" }}
            />
            <h2>Content</h2>
            <textarea style={{width: '95%', height: '20vh', borderRadius: '5px'}}>{noteToEdit?.content}</textarea>
            <h3>Side Note</h3>
            <input
              type="text"
              value={noteToEdit?.side ? noteToEdit.side : null}
              style={{ width: "95%", borderRadius: "5px" }}
            />
            <h3>Important Note</h3>
            <input
              type="text"
              value={noteToEdit?.important ? noteToEdit.important : null}
              style={{ width: "95%", borderRadius: "5px" }}
            />
          </form>
        </div>
        <div style={{ alignSelf: "center" }}>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </Modal>
  );
}
