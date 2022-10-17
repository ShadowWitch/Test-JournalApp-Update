import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCGTT42b3hIkwYA-DVdT5SMxn1u31u5OTM",
  authDomain: "react-cursos-d5f18.firebaseapp.com",
  projectId: "react-cursos-d5f18",
  storageBucket: "react-cursos-d5f18.appspot.com",
  messagingSenderId: "954519326925",
  appId: "1:954519326925:web:7c37def7eb59a4a2f9d984"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);