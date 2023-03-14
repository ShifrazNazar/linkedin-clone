import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3-_Ignl7fJfIp2EIGEDeU5hEfrOenhFM",
  authDomain: "linkedin-clone-6b0d4.firebaseapp.com",
  projectId: "linkedin-clone-6b0d4",
  storageBucket: "linkedin-clone-6b0d4.appspot.com",
  messagingSenderId: "658328136304",
  appId: "1:658328136304:web:78c529ea2ce73197c4e2b5",
  measurementId: "G-S0GPHZLT7W"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };


