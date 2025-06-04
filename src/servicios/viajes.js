import { baseDeDatos } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc
} from "firebase/firestore";

const coleccionViajes = collection(baseDeDatos, "viajes");

export const agregarViaje = async (viaje) => {
  try {
    await addDoc(coleccionViajes, viaje);
  } catch (error) {
    console.error("Error al agregar viaje:", error);
  }
};

export const obtenerViajes = async () => {
  try {
    const snapshot = await getDocs(coleccionViajes);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    return [];
  }
};

export const eliminarViaje = async (id) => {
  try {
    const referencia = doc(baseDeDatos, "viajes", id);
    await deleteDoc(referencia);
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
  }
};

export const marcarViajeComoCompleto = async (id) => {
  try {
    const referencia = doc(baseDeDatos, "viajes", id);
    await updateDoc(referencia, { completo: true });
  } catch (error) {
    console.error("Error al marcar viaje como completo:", error);
  }
};

export const anotarseEnViaje = async (idViaje, emailPasajero) => {
  try {
    const referencia = doc(baseDeDatos, "viajes", idViaje);
    const snapshot = await getDoc(referencia);
    if (!snapshot.exists()) return;

    const datos = snapshot.data();
    const pasajeros = datos.pasajeros || [];

    if (pasajeros.includes(emailPasajero)) return;

    if (pasajeros.length >= datos.lugares) {
      throw new Error("No hay lugares disponibles");
    }

    await updateDoc(referencia, {
      pasajeros: arrayUnion(emailPasajero)
    });
  } catch (error) {
    console.error("Error al anotarse al viaje:", error);
    throw error;
  }
};
