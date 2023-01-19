import Modal from "react-modal";
import classes from "./SignUpLogin.module.css";
import { useState } from "react";
import {
  logInWithEmailAndPassword,
  registerUserWithEmailAndPassword,
} from "../auth/firebase";

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
  closeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  function handleCloseModal() {
    resetModal();
    closeModal();
  }

  function resetModal() {
    setEmail('');
    setPassword('');
    setUsername('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isNewUser) {
      logInWithEmailAndPassword(email, password);
    } else {
      registerUserWithEmailAndPassword(email, password, username);
    }
    resetModal();
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
        <button onClick={() => toggleIsNewUser()}>
          {isNewUser
            ? "Back to Login"
            : "Don't have an account? Click here to sign up"}
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            placeholder="enter a username"
            onChange={({ target }) => setEmail(target.value)}
          />
          <label htmlFor="password">password: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
          {isNewUser ? (
            <>
              <label htmlFor="username">username: </label>
              <input
                type="username"
                value={username}
                placeholder="enter a username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </>
          ) : null}
          <button type="submit">{isNewUser ? "Sign up" : "Login"}</button>
        </form>
      </div>
    </Modal>
  );
}
