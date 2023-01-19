import Modal from "react-modal";
import classes from "./SignUpLogin.module.css";

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

export default function SignUpLoginModal({
    isSignUpLoginModalOpen,
    closeModal
}) {

    function handleCloseModal() {
        closeModal();
      }

    return (
        <Modal
      isOpen={isSignUpLoginModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <p>Hello</p>
      </div>
    </Modal>
    )
}
