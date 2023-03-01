import Modal from "react-modal";
import classes from "./SignUpLogin.module.css";
import { useState } from "react";
import {
  logInWithEmailAndPassword,
  registerUserWithEmailAndPassword,
} from "../auth/firebase";

export default function SignUpLoginModal({
  isSignUpLoginModalOpen,
  closeModal,
  handleNewDisplayName,
  isMobile,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const customStyles = {
    content: {
      height: "80vh",
      width: "70vw",
      position: "relative",
      zIndex: "200",
      marginLeft: !isMobile ? "11vw" : null,
      marginTop: "8vh",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "grey",
    },
  };

  function handleCloseModal() {
    resetModal();
    closeModal();
  }

  function resetModal() {
    setEmail("");
    setPassword("");
    setUsername("");
  }

  async function handleRegisterUser() {
    await registerUserWithEmailAndPassword(email, password, username);
    handleNewDisplayName(username);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isNewUser) {
      logInWithEmailAndPassword(email, password);
    } else {
      handleRegisterUser();
    }
    resetModal();
  }

  function validationCheck() {
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const validPassword = password.length >= 6;
    const validUsername = isNewUser ? username.length > 0 : true;
    if (validEmail && validPassword && validUsername) {
      return true;
    } else {
      return false;
    }
  }

  function toggleIsNewUser() {
    setIsNewUser((prevState) => !prevState);
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
        <h1 className={classes.modalTitle}>
          {isNewUser ? "Sign up" : "Login"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className={classes.modalInput}
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className={classes.modalInput}
              onChange={({ target }) => setPassword(target.value)}
              formNoValidate={true}
            />
            {isNewUser ? (
              <input
                type="username"
                value={username}
                placeholder="Username"
                className={classes.modalInput}
                onChange={({ target }) => setUsername(target.value)}
              />
            ) : null}
            <button
              className={classes.submitButton}
              type="submit"
              disabled={!validationCheck()}
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <button
            className={classes.toggleButton}
            onClick={() => toggleIsNewUser()}
          >
            {isNewUser ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  Back to <span className={classes.actionWord}>Login</span>
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  Click here to{" "}
                  <span className={classes.actionWord}>Sign up</span>
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
