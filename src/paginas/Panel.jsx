import { useState, useEffect } from "react";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";
import FormularioViaje from "../componentes/FormularioViaje";
import ListaViajes from "../componentes/ListaViajes";
import { obtenerPerfilUsuario } from "../servicios/usuarios";

const Panel = () => {
  const { usuario, cerrarSesion } = usarAutenticacion();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const navegar = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      if (usuario) {
        const datos = await obtenerPerfilUsuario(usuario.uid);
        setPerfil(datos);
      }
    };
    cargarPerfil();
  }, [usuario]);

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navegar("/");
  };

  const irAlPerfil = () => {
    navegar("/perfil");
  };

  return (
    <div className="contenedor">
      <h1>Panel de Usuario</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p><strong>Email:</strong> {usuario?.email}</p>
        {perfil && (
          <>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Apellido:</strong> {perfil.apellido}</p>
            <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          </>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button onClick={manejarCerrarSesion}>Cerrar Sesión</button>
        <button onClick={irAlPerfil}>Mi Perfil</button>
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? "Ocultar Formulario" : "Agregar Viaje"}
        </button>
      </div>

      {mostrarFormulario && <FormularioViaje />}
      <ListaViajes />
    </div>
  );
};

export default Panel;
