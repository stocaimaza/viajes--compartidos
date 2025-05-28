import { useState } from "react"; 
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import FormularioViaje from "../componentes/FormularioViaje";
import ListaViajes from "../componentes/ListaViajes";
import { useNavigate } from "react-router-dom";

const Panel = () => {
    const { usuario, cerrarSesion } = usarAutenticacion();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const navegar = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navegar("/"); // Redirigir al inicio después de cerrar sesión
    };

    return (
        <div>
            <h1>Panel de Usuario</h1>
            <p>Bienvenido, {usuario ? usuario.email : "Invitado"}</p>
            <button onClick={manejarCerrarSesion}>Cerrar Sesión</button>
            <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                {mostrarFormulario ? "Ocultar Formulario" : "Agregar Viaje"}
            </button>
            {mostrarFormulario && <FormularioViaje />}
            <ListaViajes />
        </div>
    );
}

export default Panel