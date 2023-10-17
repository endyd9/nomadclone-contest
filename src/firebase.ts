// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBo6tKBpHABMwDqfOVjDwvMPf1IvTYfYPk",
  authDomain: "x-clone-e8be9.firebaseapp.com",
  projectId: "x-clone-e8be9",
  storageBucket: "x-clone-e8be9.appspot.com",
  messagingSenderId: "992196607986",
  appId: "1:992196607986:web:7287177d947b6c6a88756b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
