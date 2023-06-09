import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ_jSDew5a9Dq-kjrdeyOr0o66O91N7SE",
  authDomain: "live-chat-b2913.firebaseapp.com",
  projectId: "live-chat-b2913",
  storageBucket: "live-chat-b2913.appspot.com",
  messagingSenderId: "720168387249",
  appId: "1:720168387249:web:4b647411d602e496c99890",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)