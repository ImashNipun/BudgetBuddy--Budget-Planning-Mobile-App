// firebaseConfig.js
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBziqje6FzC3NipOVplkjlhck5qZBXPatg",
  authDomain: "budgetbuddy-998ae.firebaseapp.com",
  projectId: "budgetbuddy-998ae",
  storageBucket: "budgetbuddy-998ae.appspot.com",
  messagingSenderId: "1083093120409",
  appId: "1:1083093120409:web:532c2015eb80c86e9d8f08",
  measurementId: "G-L4T683XF5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;
