// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAcpPdgAtItnqZhjx-m6qyXIQDgRMnORuI",
	authDomain: "prayer-connect-web.firebaseapp.com",
	projectId: "prayer-connect-web",
	storageBucket: "prayer-connect-web.appspot.com",
	messagingSenderId: "151658156510",
	appId: "1:151658156510:web:e82b679403604e17264d4f",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
