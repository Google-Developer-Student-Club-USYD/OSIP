import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


import { getDatabase, ref, set, child, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCSDeDfCG_qUj0HrVRwYk644fh_oJ7uDgM",
    authDomain: "osip-ed7ae.firebaseapp.com",
    projectId: "osip-ed7ae",
    storageBucket: "osip-ed7ae.appspot.com",
    messagingSenderId: "181014407051",
    appId: "1:181014407051:web:9260ab763797ee70f8b18e",
    databaseURL: "https://osip-ed7ae-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const db = getDatabase();

    get(child(ref(db), 'users/' + user.uid)).then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const db = getDatabase();

    get(child(ref(db), 'users/' + user.uid)).then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};