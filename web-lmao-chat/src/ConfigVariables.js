// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-LsKKq-rlxFNg5v-_8tQIiw6-i2huqW4",
  authDomain: "lmaochat-17940.firebaseapp.com",
  projectId: "lmaochat-17940",
  storageBucket: "lmaochat-17940.appspot.com",
  messagingSenderId: "121669943523",
  appId: "1:121669943523:web:7c60cd43a179431b5385d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = 'en';

const ConfigVariables = {app, auth}

export default ConfigVariables;