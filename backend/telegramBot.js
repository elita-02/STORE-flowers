const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());  

app.post('/sendMessage', async (req, res) => {
  const { message } = req.body;  

  try {
    const telegramRes = await axios.post(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
      chat_id: '<YOUR_CHAT_ID>',
      text: message,
    });

    res.json({
      message: 'Message sent successfully', 
      telegramResponse: telegramRes.data  
    });
  } catch (error) {
    res.status(500).json({ error: error.message });  
  }
});

app.listen(port, () => {
  console.log(`✅ Telegram Bot Server is running on port ${port}`);
});
