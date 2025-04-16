import React, { useEffect, useState } from 'react';
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import HappyClients from '../../Components/HappyClients/HappyClients';
import './Forum.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [recipientRole, setRecipientRole] = useState("developer");

  const currentUser = auth.currentUser;
  const isAdmin = currentUser?.email === 'admin@example.com'; // Админ текшерүүсү

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      createdAt: serverTimestamp(),
      uid: currentUser?.uid,
      displayName: currentUser?.displayName || currentUser?.email || "Аноним",
    };

    if (!isAdmin) {
      newMessage.to = recipientRole; // Рольди гана клиент кошот
    }

    await addDoc(collection(db, 'messages'), newMessage);
    setInput("");
  };

  const salesByYear = {
    2023: [900, 1100, 2000, 1300, 1400, 1800, 1200, 1800, 1900, 2500, 2100, 2300, 2500],
    2024: [1200, 1300, 2200, 1600, 3700, 2800, 4900, 3000, 3100, 2200, 3400, 3600],
    2025: [1200, 1800, 3900, 3700],
  };

  const labels = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const currentData = salesByYear[selectedYear];
  const max = Math.max(...currentData);

  const chartData = {
    labels: labels.slice(0, currentData.length),
    datasets: [
      {
        label: `Проданные товары (${selectedYear})`,
        data: currentData,
        fill: true,
        borderColor: '#ff69b4',
        backgroundColor: function (context) {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(255, 105, 180, 0.6)');
          gradient.addColorStop(1, 'rgba(255, 105, 180, 0.1)');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff69b4',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percent = ((value / max) * 100).toFixed(1);
            return `${value} шт. (${percent}%)`;
          },
        },
      },
      title: {
        display: true,
        text: `📊 Статистика продаж (${selectedYear})`,
        font: { size: 20 },
        color: '#333',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Количество продаж',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Месяцы',
        },
      },
    },
  };

  return (
    <div className="forum-wrapper">
      <section className="forum-header">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="forum-header-content"
          >
            <motion.h1>🌸 Добро пожаловать на наш форум 🌸</motion.h1>
            <motion.p>Поделитесь своим мнением — мы постараемся стать лучше!</motion.p>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="sales-statistics"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="stats-header">
          <h2>📈 Статистика продаж</h2>
          <select className="year-selector" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2023">2023 год</option>
            <option value="2024">2024 год</option>
            <option value="2025">2025 год</option>
          </select>
        </div>
        <Line data={chartData} options={chartOptions} />
      </motion.section>

      <HappyClients salesData={[...salesByYear["2023"], ...salesByYear["2024"], ...salesByYear["2025"]]} />

      <div className="chat-box">
        {!isAdmin && (
          <div className="recipient-selector">
            <label>Кому вы пишете?</label>
            <select value={recipientRole} onChange={(e) => setRecipientRole(e.target.value)}>
              <option value="developer">Девелопер</option>
              <option value="admin">Администратор</option>
              <option value="seller">Продавец</option>
              <option value="support">Колдоо кызматы</option>
              <option value="client">Клиент</option>
            </select>
          </div>
        )}

        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.uid === auth.currentUser?.uid ? 'admin' : 'client'}`}
            >
              <strong>{msg.displayName}</strong>
              {msg.to && <em> — для: {msg.to}</em>}
              <br />
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Сообщение..." />
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Forum;









// import React, { useEffect, useState } from 'react';
// import  {auth, db} from "../../firebase"
// import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

// const Forum = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const q = query(collection(db, 'messages'), orderBy('createdAt'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//     return () => unsubscribe();
//   }, []);

//   const sendMessage = async (e) => {
//     console.log("fff");
    
//     e.preventDefault();
//     if (input.trim() === "") return;

//     await addDoc(collection(db, 'messages'), {
//       text: input,
//       createdAt: serverTimestamp(),
//       uid: auth.currentUser?.uid,
//       displayName: auth.currentUser?.displayName || auth.currentUser?.email || "Аноним",
//     });

//     setInput("");
//   };

//   console.log(messages);
  

//   return (
//     <div className="chat-box">
//       <div className="messages">
//         {messages.map(msg => (
//           <div key={msg.id} className="message">
//             <strong>{msg.displayName}</strong>: {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage}>
//         <input value={input} onChange={(e) => setInput(e.target.value)} />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Forum;





