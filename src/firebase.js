// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU36GAhH-RG4e4eePQVNMo9pSqCxaGW7o",
  authDomain: "flowers-7a684.firebaseapp.com",
  projectId: "flowers-7a684",
  storageBucket: "flowers-7a684.firebasestorage.app",
  messagingSenderId: "543172694362",
  appId: "1:543172694362:web:1f4d096e8b898c4eeb6363",
  measurementId: "G-9XWMW5C32G"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)