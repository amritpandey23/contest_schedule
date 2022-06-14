// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhu-Q0ahDwLamuCTpE1IC5kKpwH7l56X8",
  authDomain: "contest-schedule-app-f9dcd.firebaseapp.com",
  projectId: "contest-schedule-app-f9dcd",
  storageBucket: "contest-schedule-app-f9dcd.appspot.com",
  messagingSenderId: "723014813940",
  appId: "1:723014813940:web:04258e80232caae1c6f6a1",
  measurementId: "G-BX1BG3FNC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
