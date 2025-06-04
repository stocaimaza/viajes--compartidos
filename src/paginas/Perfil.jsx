import { useState, useEffect } from "react";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { guardarPerfilUsuario, obtenerPerfilUsuario } from "../servicios/usuarios";

const Perfil = () => {
  const { usuario } = usarAutenticacion();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      if (usuario) {
        const datos = await obtenerPerfilUsuario(usuario.uid);
        if (datos) {
          setNombre(datos.nombre || "");
          setApellido(datos.apellido || "");
          setTelefono(datos.telefono || "");
        }
      }
    };
    cargarPerfil();
  }, [usuario]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    await guardarPerfilUsuario(usuario.uid, { nombre, apellido, telefono });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="contenedor">
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {usuario?.email}</p>
      <form onSubmit={manejarEnvio}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <button type="submit">Guardar Cambios</button>
      </form>
      {guardado && <p style={{ color: "green" }}>Perfil actualizado correctamente</p>}
      <button onClick={() => window.location.href = "/panel"} style={{ marginTop: "1rem" }}>
        Volver al Panel
      </button>

    </div>
  );
};

export default Perfil;
