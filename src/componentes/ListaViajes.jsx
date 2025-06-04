import { useState, useEffect } from "react";
import {
  obtenerViajes,
  eliminarViaje,
  marcarViajeComoCompleto,
  anotarseEnViaje,
} from "../servicios/viajes";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";

const ListaViajes = () => {
  const [viajes, setViajes] = useState([]);
  const { usuario } = usarAutenticacion();

  useEffect(() => {
    const fetchViajes = async () => {
      const viajesObtenidos = await obtenerViajes();
      setViajes(viajesObtenidos);
    };
    fetchViajes();
  }, []);

  const manejarEliminar = async (id) => {
    const confirmacion = window.confirm("¿Eliminar este viaje?");
    if (confirmacion) {
      await eliminarViaje(id);
      setViajes(viajes.filter((v) => v.id !== id));
    }
  };

  const manejarCompletar = async (id) => {
    await marcarViajeComoCompleto(id);
    setViajes(
      viajes.map((v) => (v.id === id ? { ...v, completo: true } : v))
    );
  };

  const manejarAnotarse = async (id) => {
    try {
      const viaje = viajes.find((v) => v.id === id);
      if (!viaje) return;

      const yaAnotado = viaje.pasajeros?.includes(usuario.email);
      const cupoLleno = (viaje.pasajeros?.length || 0) >= viaje.lugares;

      if (yaAnotado) {
        alert("Ya estás anotado en este viaje.");
        return;
      }

      if (cupoLleno) {
        alert("No hay lugares disponibles.");
        return;
      }

      await anotarseEnViaje(id, usuario.email);
      setViajes(
        viajes.map((v) =>
          v.id === id
            ? {
                ...v,
                pasajeros: [...(v.pasajeros || []), usuario.email],
              }
            : v
        )
      );
      alert("Te has anotado correctamente al viaje.");
    } catch (error) {
      alert("Ocurrió un error al anotarte.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de Viajes</h2>
      <ul className="lista-viajes">
        {viajes.map((viaje) => (
          <li key={viaje.id} className="card-viaje">
            <h3>{viaje.origen} → {viaje.destino}</h3>
            <p><strong>Fecha:</strong> {viaje.fecha}</p>
            <p><strong>Hora:</strong> {viaje.hora}</p>
            <p><strong>Conductor:</strong> {viaje.conductor}</p>
            <p><strong>Lugares:</strong> {viaje.lugares}</p>
            <p><strong>Precio:</strong> ${viaje.precio}</p>
            <p><strong>Estado:</strong> {viaje.completo ? "✅ Completo" : "⏳ Pendiente"}</p>
            <p><strong>Pasajeros anotados:</strong> {viaje.pasajeros?.length || 0} / {viaje.lugares}</p>

            {/* Acciones para conductor */}
            {usuario?.email === viaje.conductor && (
              <div className="card-actions">
                {!viaje.completo && (
                  <button onClick={() => manejarCompletar(viaje.id)}>Completar</button>
                )}
                <button onClick={() => manejarEliminar(viaje.id)}>Eliminar</button>
              </div>
            )}

            {/* Acción para anotarse si NO sos el conductor */}
            {usuario?.email !== viaje.conductor && !viaje.completo && (
              <div className="card-actions">
                <button onClick={() => manejarAnotarse(viaje.id)}>Anotarme</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaViajes;
