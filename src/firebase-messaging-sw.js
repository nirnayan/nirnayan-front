importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyD_5WxJm0SWFsz0YeWZLiGaetmqjHfPpw4",
    authDomain: "b2c-front.firebaseapp.com",
    projectId: "b2c-front",
    storageBucket: "b2c-front.appspot.com",
    messagingSenderId: "955156638217",
    appId: "1:955156638217:web:06981e0cdd8b25002426d8",
    measurementId: "G-DR8W97JHQY"
});
const messaging = firebase.messaging();