// import React, { useState } from 'react';
// import { db } from '../../firebase'; // Firebase конфигурациясы
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import "swiper/css"; // Swiper стили
// import "swiper/css/navigation"; // Навигация стилдери
// import "swiper/css/pagination"; // Пагинация стилдери
// import './Reviews.scss';

// function Reviews() {
//   const [reviewText, setReviewText] = useState(''); // Отзыв текст
//   const [userName, setUserName] = useState(''); // Колдонуучунун аты
//   const [imageUrl, setImageUrl] = useState(''); // Сүрөт URL

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Бардык талаалар толтурулган болсо гана жүктөө
//     if (imageUrl && userName && reviewText) {
//       // Firestore'го сактоо
//       await addDoc(collection(db, 'reviews'), {
//         review: reviewText,
//         userName: userName,
//         productId: '10', // Мисалы: продукт ID
//         createdAt: serverTimestamp(), // Дата
//         imageUrl: imageUrl, // Сүрөт URL
//       });

//       // Форманы тазалоо
//       setReviewText('');
//       setUserName('');
//       setImageUrl('');
//     } else {
//       alert('Бардык талааларды толтуруңуз!'); // Сүрөт, текст жана ат толтурулбаса алерт чыгат
//     }
//   };

//   return (
//     <div className="reviews">
//       <h2>Отзыв калтыруу</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Атыңыз"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Отзыв жазыңыз"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Сүрөт URL киргизиңиз"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}  // URLди киргизүү
//         />
//         <button type="submit">Жүктөө</button>
//       </form>

//       <h3>Фото Отзывы</h3>
//       <Swiper
//         spaceBetween={30} // Слайдтардын ортосундагы аралык
//         slidesPerView={1}  // Бир слайд гана көрсөтүлөт
//         loop={true}  // Слайдер үзгүлтүксүз айланат
//         autoplay={{
//           delay: 3000, // 3 секунд сайын сүрөт алмашат
//           disableOnInteraction: false, // Кол менен таптаганда автоматтык багытталган сүрөт сакталат
//         }}
//         navigation={true} // Навигация (булттар) пайда болот
//         pagination={{ clickable: true }} // Пагинация (слайддардын нөмөрлөрү)
//         className="reviews-slider"
//       >
//         <SwiperSlide>
//           <img src={imageUrl} alt="Отзыв сүрөтү" className="review-image" />
//         </SwiperSlide>
//         {/* Кошумча слайдтарды бул жерге кошо аласыз */}
//       </Swiper>
//     </div>
//   );
// }

// export default Reviews;



// import React, { useState } from 'react';
// import { db, storage } from '../../firebase';  // Firebase конфигурациясы
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css'; // Swiper стилдерин туура импорттоо
// import './Reviews.scss';
// import Uploads from '../../Components/Uploads/Uploads';

// function Reviews() {
//   const [reviewText, setReviewText] = useState(''); // Отзыв текст
//   const [userName, setUserName] = useState(''); // Колдонуучунун аты
//   const [image, setImage] = useState(null); // Сүрөт
//   const [imageUrl, setImageUrl] = useState(''); // Сүрөт URL

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]; // Ноутбуктан тандаган сүрөт
//     if (file) {
//       setImage(file); // Сүрөттү сактоо
//       const reader = new FileReader(); 
//       reader.onloadend = () => {
//         setImageUrl(reader.result); // Сүрөттү URL менен сактоо
//       };
//       reader.readAsDataURL(file); // Сүрөттү URL катары окуу
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!image) {
//       alert('Сүрөттү тандаңыз!');
//       return;
//     }
  
//     try {
//       // 1. Сүрөттү Firebase Storage'ке жүктөө
//       const imageRef = ref(storage, `reviews/${Date.now()}-${image.name}`);
//       await uploadBytes(imageRef, image);
  
//       // 2. Сүрөттүн жүктөлгөн URL алуу
//       const downloadURL = await getDownloadURL(imageRef);
//       console.log("Сүрөт жүктөлдү, URL:", downloadURL);
  
//       // 3. Firestore'го маалыматтарды сактоо
//       await addDoc(collection(db, 'reviews'), {
//         review: reviewText,
//         userName: userName,
//         productId: '10',
//         createdAt: serverTimestamp(),
//         imageUrl: downloadURL,
//       });
  
//       // 4. Форманы тазалоо
//       setReviewText('');
//       setUserName('');
//       setImage(null);
//       setImageUrl('');
//       alert('Отзыв ийгиликтүү жүктөлдү!');
  
//     } catch (error) {
//       console.error('Firebase жүктөөдө ката:', error);
//       alert('Жүктөөдө ката чыкты!');
//     }
//   };
  

//   return (
//     <div className="reviews">
//       <h2>Отзыв калтыруу</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Атыңыз"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Отзыв жазыңыз"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           required
//         />

//         {/* Сүрөттүн URL көрсөтүлөт */}
//         <div className="file-upload">
//           {imageUrl && (
//             <img src={imageUrl} alt="Uploaded Review" className="uploaded-image" />
//           )}
//           <input
//             type="file"
//             onChange={handleImageChange}
//             accept="image/*"
//             id="file-input"
//             style={{ display: 'none' }} // "Выберите файл" текстин жасыруу
//           />
//           <label htmlFor="file-input" className="upload-label">
//             {imageUrl ? 'Жүктөлгөн сурот' : 'Сүрөттү тандаңыз'}
//           </label>
//         </div>
//       <div onSubmit={handleSubmit}>
//         <button type="submit">Жүктөө</button>

//       </div>
//       </form>

//       {/* Сүрөт карусели */}
//       {imageUrl && (
//         <div className="carousel">
//           <Swiper
//             spaceBetween={10}
//             slidesPerView={1}
//             loop={true}
//           >
//             <SwiperSlide>
//               <img src={imageUrl} alt="Uploaded Review" className="carousel-image" />
//             </SwiperSlide>
//           </Swiper>
//         </div>
//       )}
//             <Uploads />

//     </div>
//   );
// }

// export default Reviews;


import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Firebase конфигурациясы
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Uploads from '../../Components/Uploads/Uploads';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';

function Reviews() {


  return (
    <div>
       {/* <ReviewForm/> */}
      <Uploads/>
    </div>
  );
}

export default Reviews;
