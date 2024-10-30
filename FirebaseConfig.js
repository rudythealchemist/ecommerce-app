import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDiepf5NiQVfDwdDa0DOWxH9MUnJj6sN_M", 
  authDomain: "ecommerce-app-eabac.firebaseapp.com", 
  projectId: "ecommerce-app-eabac", 
  storageBucket: "ecommerce-app-eabac.appspot.com", 
  messagingSenderId: "125936515994", 
  appId: "1:125936515994:web:bbdfb193f03a8db5329823", 
  measurementId: "G-YSW4Y0ZYB5", 
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };