import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export const addEventToFirestore = async (event) => {
  try {
    await addDoc(collection(db, "calendarEvents"), event);
  } catch (error) {
    console.error("Окуяны сактоо катасы:", error);
  }
};

export const getAllEvents = async () => {
  try {
    const q = query(collection(db, "calendarEvents"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Окуяларды алуу катасы:", error);
    return [];
  }
};
