// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0AnA34zjwYzbU8jGNuBWIZjTUyyeZa1M',
  authDomain: 'firechat-3845d.firebaseapp.com',
  projectId: 'firechat-3845d',
  storageBucket: 'firechat-3845d.appspot.com',
  messagingSenderId: '895405979139',
  appId: '1:895405979139:web:4238f56e3200f67bcb4036',
  measurementId: 'G-GR9C8XL7Q1'
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(process.env.RECAPTCHA),
//   isTokenAutoRefreshEnabled: true,
// });

export { auth, db };