import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-react-6738b.firebaseapp.com",
  projectId: "netflix-clone-react-6738b",
  storageBucket: "netflix-clone-react-6738b.appspot.com",
  messagingSenderId: "661274798735",
  appId: "1:661274798735:web:d321baa3d976c0bfa09efa",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
