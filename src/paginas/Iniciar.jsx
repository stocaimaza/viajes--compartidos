import { useState } from "react"; 
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

const Iniciar = () => {
    const {iniciarSesion, iniciarSesionConGoogle} = usarAutenticacion(); 
    const [correo, setCorreo] = useState(''); 
    const [contrasena, setContrasena] = useState(''); 
    const navegar = useNavigate(); 

    //Funciones auxiliares: 

    const manejarInicio = async () => {
        e.preventDefault(); 
        try {
            await iniciarSesion(correo, contrasena); 
            //Vamos a navegar a otra pagina: 
            navegar("/panel"); 
        } catch (error) {
            console.log(error, "vamos a re morir"); 
        }
    }

    const manejarGoogle = async () => {
        try {
            await iniciarSesionConGoogle(); 
            navegar("/panel"); 
        } catch (error) {
            alert("todo es tragedia y dolor"); 
        }
    }

  return (
    <div className="contenedor">
        <form className="formulario" onSubmit={ manejarInicio }>
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
            <button type="submit"> Ingresar </button>
        </form>
        <button onClick={ manejarGoogle }> Ingresar con Google </button>
    </div>
  )
}

export default Iniciar