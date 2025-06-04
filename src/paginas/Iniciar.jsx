import { useState } from "react";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

const Iniciar = () => {
  const { iniciarSesion } = usarAutenticacion();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const manejarInicio = async (e) => {
    e.preventDefault();
    try {
      await iniciarSesion(correo, contrasena);
      navigate("/panel"); // redirige si se inicia sesión correctamente
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="contenedor">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarInicio}>
        <input
          type="email"
          placeholder="Correo electrónico"
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
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default Iniciar;

