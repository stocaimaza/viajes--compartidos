import { useState } from "react"; 
import { agregarViaje } from "../servicios/viajes"; 
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";


const FormularioViaje = () => {
    const { usuario } = usarAutenticacion(); 
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [lugares, setLugares] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");

    //Funcion auxiliar:

    const manejarEnvio = async (e) => {
        e.preventDefault(); 
        const viaje = {
            origen,
            destino,
            fecha,
            hora,
            lugares: parseInt(lugares),
            precio: parseFloat(precio),
            tipo,
            conductor: usuario.email // Guardamos el email del usuario que crea el viaje
        };

        await agregarViaje(viaje);
        // Limpiar el formulario después de enviar
        setOrigen("");
        setDestino(""); 
        setFecha("");
        setHora("");
        setLugares("");
        setPrecio("");
        setTipo("");
        alert("Viaje agregado exitosamente");
    }
    
    

  return (
    <form onSubmit={ manejarEnvio }>
        <input type="text" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} required />
        <input type="text" placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} required />
        <input type="date" placeholder="Fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="time" placeholder="Hora" value={hora} onChange={(e) => setHora(e.target.value)} required />
        <input type="number" placeholder="Lugares" value={lugares} onChange={(e) => setLugares(e.target.value)} required />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Seleccione tipo de viaje</option>
            <option value="privado">Privado</option>
            <option value="compartido">Compartido</option>
        </select>
        <button type="submit">Agregar Viaje</button>
    </form>
  )
}

export default FormularioViaje