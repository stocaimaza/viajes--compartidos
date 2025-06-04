import { useState } from "react";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const { registrar } = usarAutenticacion();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      await registrar(correo, contrasena);
      navigate("/panel"); // Redirige al panel después del registro
    } catch (err) {
      console.error(err);
      setError("Error al registrar: " + err.message);
    }
  };

  return (
    <div className="contenedor">
      <h2>Registrarse</h2>
      <form onSubmit={manejarRegistro}>
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default Registrar;
