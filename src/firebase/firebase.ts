import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtDanQSSlP_V25S0_AinHuRJFQuLxrIQ0",
  authDomain: "online-meeting-uz.firebaseapp.com",
  projectId: "online-meeting-uz",
  storageBucket: "online-meeting-uz.appspot.com",
  messagingSenderId: "279295638153",
  appId: "1:279295638153:web:ad8c0848e22309149fe458",
  measurementId: "G-J6QHEDE3BC",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { db, auth, analytics, app };
