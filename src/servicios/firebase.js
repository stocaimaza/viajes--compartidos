
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCK3NrFgcdHlzs3Nq-_iBtPAXnDLFEQzvU",
  authDomain: "autenticacion-c6662.firebaseapp.com",
  projectId: "autenticacion-c6662",
  storageBucket: "autenticacion-c6662.firebasestorage.app",
  messagingSenderId: "50322449845",
  appId: "1:50322449845:web:582f609020cb3168fae5fc"
};


const app = initializeApp(firebaseConfig);

//Vamos a crear unas instancias que vamos a exportar:
export const autenticacion = getAuth(app); 
export const baseDeDatos = getFirestore(app); 