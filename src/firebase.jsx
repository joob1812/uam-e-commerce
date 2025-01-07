// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCkQ-MpVMazs3f2td2H506uK1MVFMSrr5I",
//     authDomain: "joob-1812.firebaseapp.com",
//     projectId: "joob-1812",
//     storageBucket: "joob-1812.firebasestorage.app",
//     messagingSenderId: "387551308447",
//     appId: "1:387551308447:web:ccbdee837dd8d710c010aa",
//     measurementId: "G-DRL2MMFW90"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// src/firebase.jsx

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkQ-MpVMazs3f2td2H506uK1MVFMSrr5I",
    authDomain: "joob-1812.firebaseapp.com",
    projectId: "joob-1812",
    storageBucket: "joob-1812.firebasestorage.app",
    messagingSenderId: "387551308447",
    appId: "1:387551308447:web:ccbdee837dd8d710c010aa",
    measurementId: "G-DRL2MMFW90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Assure-toi d'exporter `app` et `analytics` correctement
export { app, analytics };
