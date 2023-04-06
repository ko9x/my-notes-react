import Modal from "react-modal";
import classes from "./SignUpLogin.module.css";
import { useState } from "react";
import {
  logInWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  sendPasswordReset
} from "../auth/firebase";

export default function SignUpLoginModal({
  isSignUpLoginModalOpen,
  closeModal,
  handleNewDisplayName,
  isMobile,
  modalBackgroundColor
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const customLargeStyles = {
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
      backgroundColor: `${modalBackgroundColor}`,
    },
  };

  const customMobileStyles = {
    content: {
      height: "90%",
      width: '85%',
      inset: '0',
      marginTop: '10%',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '25px',
      zIndex: "200",
      backgroundColor: `${modalBackgroundColor}`,
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

  function handlePasswordReset() {
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(validEmail) {
      sendPasswordReset(email);
    } else {
      alert('Please enter a valid email into the Email field')
    }
  }

  function toggleIsNewUser() {
    setIsNewUser((prevState) => !prevState);
  }

  return (
    <Modal
      isOpen={isSignUpLoginModalOpen}
      style={isMobile ? customMobileStyles : customLargeStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={500}
    >
      <div className={classes.container}>
        <h1 className={classes.modalTitle}>
          {isNewUser ? "Sign up" : "Login"}
        </h1>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <input
              type="email"
              value={email}
              placeholder="email"
              className={classes.modalInput}
              style={{width: isMobile ? '90%' : '60%'}}
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              className={classes.modalInput}
              style={{width: isMobile ? '90%' : '60%'}}
              onChange={({ target }) => setPassword(target.value)}
              formNoValidate={true}
            />
            {isNewUser ? (
              <input
                type="username"
                value={username}
                placeholder="username"
                className={classes.modalInput}
                style={{width: isMobile ? '90%' : '60%'}}
                onChange={({ target }) => setUsername(target.value)}
              />
            ) : null}
            <button
              className={classes.submitButton}
              style={{width: isMobile ? '70%' : '300px'}}
              type="submit"
              disabled={!validationCheck()}
            >
              Submit
            </button>
          </div>
        </form>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <button
            className={classes.bottomButton}
            onClick={() => handlePasswordReset()}
          >
            <span className={classes.actionWord}>Forgot Password?</span>
          </button>
          <button
            className={classes.bottomButton}
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
