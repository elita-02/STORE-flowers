import React, { useState } from 'react';
// import './Checkout.scss'; // Кошумча: өзүңдүн стилиңди кош

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const cartItems = [
    { id: 1, title: 'Кызыл гүл', quantity: 2, price: 500 },
    { id: 2, title: 'Ак роза', quantity: 1, price: 800 },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Бул жерде заказды серверге жиберсең болот
    console.log('Заказ:', formData);
    nextStep();
  };

  return (
    <div className="checkout container" style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>📝 Оформление заказа</h2>

      <div className="steps" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        {['Корзина', 'Инфо о заказе', 'Завершение'].map((label, index) => (
          <div key={index} style={{
            flex: 1,
            textAlign: 'center',
            borderBottom: step === index + 1 ? '3px solid #ff6b6b' : '2px solid lightgray',
            fontWeight: step === index + 1 ? 'bold' : 'normal'
          }}>
            {label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="cart-step">
          {cartItems.length === 0 ? (
            <p>Корзина пуста.</p>
          ) : (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} style={{ marginBottom: '8px' }}>
                    {item.title} — {item.quantity} x {item.price} сом
                  </li>
                ))}
              </ul>
              <button onClick={nextStep} style={btnStyle}>Далее</button>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="order-form">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <textarea
            name="comment"
            placeholder="Комментарий"
            value={formData.comment}
            onChange={handleChange}
            style={{ ...inputStyle, height: '80px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <button onClick={prevStep} style={btnStyleGray}>Назад</button>
            <button onClick={handleSubmit} style={btnStyle}>Подтвердить</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <h3>🎉 Спасибо за заказ!</h3>
          <p>Мы свяжемся с вами в ближайшее время.</p>
        </div>
      )}
    </div>
  );
};

// 🔘 Стили
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
};

const btnStyleGray = {
  ...btnStyle,
  backgroundColor: '#ccc',
};

export default Checkout;

