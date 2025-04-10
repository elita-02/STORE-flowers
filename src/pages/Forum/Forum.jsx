import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Forum.scss';

function Forum() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [isReplying, setIsReplying] = useState(null); // Жооп жазуу учуру

  // Пикирлерди жүктөө
  useEffect(() => {
    const getComments = async () => {
      const querySnapshot = await getDocs(collection(db, "comments"));
      const commentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsList);
    };

    getComments();
  }, []);

  // Пикирди жөнөтүү
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      name,
      message,
      reply: null,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "comments"), newComment);
      setComments(prev => [{ id: docRef.id, ...newComment }, ...prev]);
      setName('');
      setMessage('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  // Пикирге жооп кошуу
  const handleReply = async (commentId) => {
    if (reply.trim() !== '') {
      const commentRef = doc(db, "comments", commentId);
      await updateDoc(commentRef, { reply });

      // Жооп жазылган соң, комментарийди жаңыртуу
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? { ...comment, reply } : comment
      ));

      // Жооп жазуу формасын тазалоо
      setIsReplying(null);
      setReply('');
    }
  };

  return (
    <div className="forum-container">
      <h2>Пикирлер жана сунуштар</h2>
      
      <div className="comments-list">
        {comments.map((item) => (
          <div key={item.id} className="comment-box">
            <p><strong>{item.name}:</strong> {item.message}</p>
            {item.reply ? (
              <div className="reply">
                <strong>Биздин жооп:</strong> {item.reply}
              </div>
            ) : (
              <button onClick={() => setIsReplying(item.id)}>
                Жооп берүү
              </button>
            )}
            
            {isReplying === item.id && (
              <div className="reply-form">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Жооп жазыңыз..."
                />
                <button onClick={() => handleReply(item.id)}>Жооп жөнөтүү</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Атыңыз" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Сиздин ой-пикириңиз..." 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          required 
        />
        <button type="submit">Жөнөтүү</button>
      </form>
    </div>
  );
}

export default Forum;




