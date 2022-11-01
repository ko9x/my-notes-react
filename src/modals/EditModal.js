import Modal from 'react-modal';

const customStyles = {
    content: {
      height: '50vh',
      width: '50vw',
      position: 'relative',
      zIndex: '200',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'grey',
    },
    
  };

export default function EditModal({isModalOpen, closeModal, noteToEdit}) {

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <h2>Title</h2>
          <input placeholder={noteToEdit?.title} />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    )

}