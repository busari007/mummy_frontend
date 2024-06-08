// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjsIM5GqDh_EtHN5Jfz_BFJXuMdcR32q0",
  authDomain: "omosedb.firebaseapp.com",
  projectId: "omosedb",
  storageBucket: "omosedb.appspot.com",
  messagingSenderId: "563607353786",
  appId: "1:563607353786:web:6db8fcdc377253d4c64583",
  measurementId: "G-ERF6MXN8YV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { storage, auth };
