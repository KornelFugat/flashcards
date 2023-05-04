// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvHZc1c1cj9zRYZXUyTgeGaV6r8Nd8xqg",
  authDomain: "flashcard-project-uek.firebaseapp.com",
  databaseURL: "https://flashcard-project-uek-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flashcard-project-uek",
  storageBucket: "flashcard-project-uek.appspot.com",
  messagingSenderId: "28346355490",
  appId: "1:28346355490:web:8884039b0f87b070bd1f7b",
  measurementId: "G-T0Q327WRMG"
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed

export default app
export const auth = getAuth(app)
export const db = getFirestore(app)