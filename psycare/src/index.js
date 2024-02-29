import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './splash.css'
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database';
import { getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { useAuthState } from 'react-firebase-hooks/auth';

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
const db = getDatabase();

//an object of configuration values
const firebaseUIConfig = {
  signInOptions: [ //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: { //"lifecycle" callbacks
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    }
  }
}

//the React compnent to render
function MySignInScreen() {

  const auth = getAuth(); //access the "authenticator"

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}

const auth = getAuth();

onAuthStateChanged(auth, (firebaseUser) => {
    if(firebaseUser){ //firebaseUser defined: is logged in
        console.log('logged in', firebaseUser.displayName);
        //do something with firebaseUser (e.g. assign to a state variable)
    }
    else { //firebaseUser is undefined: is not logged in
        console.log('logged out');
    }
});

// function MyComponent(props) {
//   //effect hook
//   useEffect(() => {
//     const auth = getAuth();

//     //returns a function that will "unregister" (turn off) the listener
//     const unregisterFunction = onAuthStateChanged(auth, (firebaseUser) => {
//       //handle user state change
//       if(firebaseUser){
//         //...
//       }
//     })

//     //cleanup function for when component is removed
//     function cleanup() {
//       unregisterFunction(); //call the unregister function
//     }
//     return cleanup; //effect hook callback returns the cleanup function
//   })
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
