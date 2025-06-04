// servicios/usuarios.js
import { baseDeDatos } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const guardarPerfilUsuario = async (uid, datos) => {
  const referencia = doc(baseDeDatos, "usuarios", uid);
  await setDoc(referencia, datos, { merge: true }); // merge mantiene lo anterior
};

export const obtenerPerfilUsuario = async (uid) => {
  const referencia = doc(baseDeDatos, "usuarios", uid);
  const snap = await getDoc(referencia);
  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
};
