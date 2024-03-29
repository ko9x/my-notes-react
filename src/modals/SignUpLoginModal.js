import Modal from "react-modal";
import classes from "./SignUpLogin.module.css";
import { useState } from "react";
import {
  logInWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  sendPasswordReset
} from "../auth/firebase";
import { ClipLoader } from "react-spinners";

export default function SignUpLoginModal({
  isSignUpLoginModalOpen,
  closeModal,
  handleNewDisplayName,
  isMobile,
  modalBackgroundColor,
  textColor,
  enableDemoMode
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [hasNoAccount, setHasNoAccount] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const spinnerOverride: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    margin: 'auto',
    zIndex: '1000'
  }

  const customLargeStyles = {
    content: {
      height: "80%",
      width: "70%",
      position: "relative",
      zIndex: "200",
      marginLeft: "10%",
      marginTop: "30px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "25px",
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

  function resetModal() {
    setEmail("");
    setPassword("");
    setUsername("");
  }

  async function handleRegisterUser() {
    await registerUserWithEmailAndPassword(email, password, username);
    setIsLoadingUser(false);
    handleNewDisplayName(username);
  }

  async function handleSubmit(e) {
    setIsLoadingUser(true);
    e.preventDefault();
    if (!hasNoAccount) {
      await logInWithEmailAndPassword(email, password);
      setIsLoadingUser(false);
    } else {
      handleRegisterUser();
    }
    resetModal();
  }

  function validationCheck() {
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const validPassword = password.length >= 6;
    const validUsername = hasNoAccount ? username.length > 0 : true;
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

  function toggleUserStatus() {
    setHasNoAccount((prevState) => !prevState);
  }

  return (
    <>
      <ClipLoader
        color={textColor}
        loading={isLoadingUser}
        cssOverride={spinnerOverride}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Modal
        isOpen={isSignUpLoginModalOpen}
        style={isMobile ? customMobileStyles : customLargeStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <div className={classes.container}>
          <h1 className={classes.modalTitle}>
            {hasNoAccount ? "Sign up" : "Login"}
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
              {hasNoAccount ? (
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
              style={{paddingBottom: '20px'}}
              onClick={() => handlePasswordReset()}
            >
              <span className={classes.actionWord}>Forgot Password?</span>
            </button>
            <button
              className={classes.bottomButton}
              onClick={() => toggleUserStatus()}
            >
              {hasNoAccount ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    Back to <span className={classes.actionWord}>Login</span>
                  </span>
                  <span style={{paddingTop: '4px'}}>or</span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    Don't have an account? Click here to{" "}
                    <span className={classes.actionWord}>Sign up</span>
                  </span>
                  <span style={{paddingTop: '4px'}}>or</span>
                </div>
              )}
            </button>
            <button
              className={classes.bottomButton}
              onClick={() => enableDemoMode()}
            >
              <span>
                    Check out{" "}
                    <span className={classes.actionWord}>Demo mode</span>
                  </span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
