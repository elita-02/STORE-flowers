
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CountUp from "react-countup";
import "./HappyClients.scss";

const HappyClients = () => {
  const [stats, setStats] = useState({
    total: 0,
    regular: 0,
    happy: 0,
    error: 0,
    admins: 0,
  });

  useEffect(() => {
    const unsubscribeClients = onSnapshot(collection(db, "clients"), (snapshot) => {
      let total = 0;
      let regular = 0;
      let happy = 0;
      let error = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt || new Date(data.createdAt.toDate()).getFullYear() < 2023) return;
        total++;
        if (data.status === "regular") regular++;
        else if (data.status === "happy") happy++;
        else if (data.status === "error") error++;
      });

      setStats((prev) => ({
        ...prev,
        total,
        regular,
        happy,
        error,
      }));
    });

    const unsubscribeAdmins = onSnapshot(collection(db, "users"), (snapshot) => {
      const admins = snapshot.size;
      setStats((prev) => ({ ...prev, admins }));
    });

    return () => {
      unsubscribeClients();
      unsubscribeAdmins();
    };
  }, []);

  const statsData = [
    { title: "Всего клиентов", value: stats.total + 45000 },
    { title: "Постоянные клиенты", value: stats.regular + 32004 },
    { title: "Довольные клиенты", value: stats.happy + 24408 },
    { title: "Ошибочные заказы", value: stats.error - 1208 },
    { title: "Зарегистрированные пользователи", value: stats.admins + 34708 }
  ];

  return (
    <div className="client-stats container">
      <h2>Статистика клиентов с 2023 года</h2>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.title}</h3>
            <p><CountUp end={stat.value} duration={10} /></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HappyClients;