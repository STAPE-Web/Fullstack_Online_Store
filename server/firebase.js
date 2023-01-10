import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBer5b5vk3QSvTu-A6U9RUgDNXz3aOb7RA",
    authDomain: "movie-app-dc5ba.firebaseapp.com",
    projectId: "movie-app-dc5ba",
    storageBucket: "movie-app-dc5ba.appspot.com",
    messagingSenderId: "931531261280",
    appId: "1:931531261280:web:65a7577a58735c82128a05"
};

initializeApp(firebaseConfig);

export const db = getFirestore()