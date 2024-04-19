import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-q_Yp-tnr_D1nyyQO-An3B0U1FmJ5Qfk",
  authDomain: "psycare-56a2d.firebaseapp.com",
  projectId: "psycare-56a2d",
  storageBucket: "psycare-56a2d.appspot.com",
  messagingSenderId: "152169123075",
  appId: "1:152169123075:web:62ff09723de45901d72d36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get a reference to the database service
// const db = getDatabase();
const db = getFirestore(app);
export default db;

export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
}