import telebot 

TOKEN = '7222270415:AAE6FxN_84XnQEHxDjraObWqz4toy9taC7Y'
bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, """Здравствуйте, меня зовут StoreBot 🌸
Я — официальный бот магазина STORE-FLOWERS 💐

Я помогу вам:
— Выбрать идеальный букет
— Узнать о наших акциях и скидках
— Оформить заказ с доставкой 🚚
— Получить помощь от менеджера 🧑‍💼

Чтобы начать, просто выберите нужную команду или напишите мне.
Готовы подарить радость? Давайте начнем! 🌷""")

bot.polling(none_stop=True)
