import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut, deleteUser } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJUm2Qdj_jwCfgKKc1ImgaGzPzxmumtw4",
  authDomain: "my-notes-64d6a.firebaseapp.com",
  databaseURL: "https://my-notes-64d6a.firebaseio.com",
  storageBucket: "my-notes-64d6a.appspot.com",
  messagingSenderId: "921992896364",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert('Please enter a valid Email and Password');
    }
  };

const registerUserWithEmailAndPassword = async (email, password, username) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          return username;
        })
      })
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (err) {
    console.log(err);
    alert('Password reset email sent!');
  }
}

const signUserOut = () => {
  signOut(auth);
}

const handleDeleteUser = (user) => {
  deleteUser(user);
}

  export {
    auth,
    database,
    logInWithEmailAndPassword,
    registerUserWithEmailAndPassword,
    sendPasswordReset,
    signUserOut,
    handleDeleteUser
  }