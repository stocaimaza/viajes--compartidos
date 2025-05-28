import { Link } from "react-router-dom"; 

const Inicio = () => {
  return (
    <div>
        <h1>Bienvenidos a "Viajes Compartidos"</h1>
        <p> Una forma de colaborativa de viajar entre Santa Clara del Mar y Mar del Plata</p>
        <Link to="/iniciar"> 
            <button> Iniciar Sesión </button>
        </Link>
        
        <Link to="/registrar"> 
            <button> Registrarse </button>
        </Link>
    </div>  
  )
}

export default Inicio