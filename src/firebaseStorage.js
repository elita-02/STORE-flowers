import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Файлды жүктөө функциясы
const uploadFile = (file) => {
  const storageRef = ref(storage, 'uploads/' + file.name);  // Storage'ке жүктөө үчүн жолду түзүңүз
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Прогресс бар болсо
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      // Ката чыкса
      console.error('Upload failed', error);
    },
    () => {
      // Жүктөө аяктагандан кийин
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);  // Жүктөлгөн файлдын URL'ин алабыз
      });
    }
  );
};
