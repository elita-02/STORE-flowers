import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

// Фейк база (мисалы үчүн)
const fakeDatabase = [];

const MyComponent = () => {
  const [data, setData] = useState('');

  const handleAdd = () => {
    // Дубликат барбы?
    const isDuplicate = fakeDatabase.includes(data);

    if (isDuplicate) {
      toast.error("Бул маалымат мурунтан бар!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      fakeDatabase.push(data); // кошобуз
      toast.success("Ийгилик менен кошулду!", {
        position: "top-right",
        autoClose: 3000,
      });
      setData('');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Маалымат жазыңыз"
        className="border p-2 mb-2 w-full"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Кошуу
      </button>
      <ToastContainer />
    </div>
  );
};

export default MyComponent;
