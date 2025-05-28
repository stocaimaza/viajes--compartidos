import { useState, useEffect } from "react"; 
import { obtenerViajes } from "../servicios/viajes";

const ListaViajes = () => {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const fetchViajes = async () => {
      const viajesObtenidos = await obtenerViajes();
      setViajes(viajesObtenidos);
    };

    fetchViajes();
  }, []);

  return (
    <div>
      <h2>Lista de Viajes</h2>
      <ul>
        {viajes.map(viaje => (
          <li key={viaje.id}>{viaje.origen} - {viaje.destino}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListaViajes