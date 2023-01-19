import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
      alert(err.message);
    }
  };

const registerUserWithEmailAndPassword = async (email, password, username) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username
        })
      })
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export {
    auth,
    database,
    logInWithEmailAndPassword,
    registerUserWithEmailAndPassword,
  }