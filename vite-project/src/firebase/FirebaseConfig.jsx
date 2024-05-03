import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZowdX0zXjj4y0AlwruMdJYnA_BGLKtjA",
  authDomain: "e-kapda.firebaseapp.com",
  projectId: "e-kapda",
  storageBucket: "e-kapda.appspot.com",
  messagingSenderId: "314000371966",
  appId: "1:314000371966:web:bcb8d0a3d322bcc3e7f5af"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;