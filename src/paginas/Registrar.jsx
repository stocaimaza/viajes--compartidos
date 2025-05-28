import { useState } from "react";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
    const { registrar } = usarAutenticacion();
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navegar = useNavigate(); 

    //Funcion auxiliar: 

    const manejarRegistro = async (e) => {
        e.preventDefault(); 
        try {
            await registrar(correo, contrasena); 
            navegar("/panel"); 
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={ manejarRegistro }>
            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
            />
            <button type="submit"> Registrarse </button>
        </form>
    )
}

export default Registrar