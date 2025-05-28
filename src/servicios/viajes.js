import { baseDeDatos } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const coleccionViajes = collection(baseDeDatos, "viajes");

export const agregarViaje = async (viaje) => {
    try {
        await addDoc(coleccionViajes, viaje);        
    } catch (error) {
        console.error("Error al agregar viaje:", error);
    }
}

export const obtenerViajes = async () => {
    try {
        const snapshot = await getDocs(coleccionViajes);
        const viajes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return viajes;
    } catch (error) {
        console.error("Error al obtener viajes:", error);
        return [];
    }
}