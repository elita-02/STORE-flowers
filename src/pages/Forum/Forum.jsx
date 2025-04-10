// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
// // import { db } from '../../firebase'; 

// const Forum = () => {
//   const [comment, setComment] = useState('');
//   const [allComments, setAllComments] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "comments"), (snapshot) => {
//       const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setAllComments(fetchedComments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
//     });
//     return () => unsub();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       await addDoc(collection(db, "comments"), {
//         text: comment,
//         createdAt: serverTimestamp()
//       });
//       setComment('');
//     }
//   };

//   return (
//     <div className="feedback-section">
//       <h2>Отзывы клиентов</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Оставьте ваш отзыв..."
//           required
//         />
//         <button type="submit">Отправить</button>
//       </form>

//       <div className="comments-list">
//         {allComments.map(c => (
//           <div key={c.id} className="comment">
//             <p>{c.text}</p>
//             <span>{c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000).toLocaleString() : ''}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Forum;
