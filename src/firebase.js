// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAU36GAhH-RG4e4eePQVNMo9pSqCxaGW7o",
//   authDomain: "flowers-7a684.firebaseapp.com",
//   projectId: "flowers-7a684",
//   storageBucket: "flowers-7a684.firebasestorage.app",
//   messagingSenderId: "543172694362",
//   appId: "1:543172694362:web:1f4d096e8b898c4eeb6363",
//   measurementId: "G-9XWMW5C32G"
// };

// // Firebase'ди баштоо
// const app = initializeApp(firebaseConfig);

// // Firestore, Authentication жана Storage'го туташуу
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // 👈 GoogleAuthProvider'ди коштук
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAU36GAhH-RG4e4eePQVNMo9pSqCxaGW7o",
  authDomain: "flowers-7a684.firebaseapp.com",
  projectId: "flowers-7a684",
  storageBucket: "flowers-7a684.firebasestorage.app",
  messagingSenderId: "543172694362",
  appId: "1:543172694362:web:1f4d096e8b898c4eeb6363",
  measurementId: "G-9XWMW5C32G"
};

// Firebase'ди баштоо
const app = initializeApp(firebaseConfig);

// Түзүлгөн сервистерди экспорттоо
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// 👇 Google менен аутентификация үчүн провайдерди кошобуз
export const googleProvider = new GoogleAuthProvider();
