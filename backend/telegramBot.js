const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());  // JSON форматта алынган маалыматтарды иштеп чыгуу

// POST /sendMessage - бул API Telegramга билдирүү жиберүүчү API
app.post('/sendMessage', async (req, res) => {
  const { message } = req.body;  // Жиберилген билдирүү

  // Telegram API'га чакыруу
  try {
    const telegramRes = await axios.post(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
      chat_id: '<YOUR_CHAT_ID>',
      text: message,
    });

    res.json({
      message: 'Message sent successfully',  // Успех билдирүүсү
      telegramResponse: telegramRes.data   // Telegramдан келген жооп
    });
  } catch (error) {
    res.status(500).json({ error: error.message });  // Эгер ката болсо
  }
});

// Сервердин иштеши
app.listen(port, () => {
  console.log(`✅ Telegram Bot Server is running on port ${port}`);
});
