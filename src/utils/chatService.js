// import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebase"; // өзүңө жараша путь туурала

// const collectionRef = collection(db, "chat");

// export const sendMessage = async (username, message) => {
//   try {
//     const docRef = await addDoc(collectionRef, {
//       username,
//       message,
//       timestamp: new Date()
//     });
//     return docRef;
//   } catch (e) {
//     console.error("Error sending message: ", e);
//     throw e;
//   }
// };

// export const fetchMessages = async () => {
//   const q = query(collectionRef, orderBy("timestamp", "desc"));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map(doc => doc.data());

