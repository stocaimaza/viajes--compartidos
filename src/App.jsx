import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ProveedorAutenticacion } from "./contexto/ContextoAutenticacion"; 
import Iniciar from "./paginas/Iniciar";
import Panel from "./paginas/Panel";
import Inicio from "./paginas/Inicio";
import Registrar from "./paginas/Registrar";
import './App.css'; // Importar estilos globales
import Perfil from "./paginas/Perfil";

const App = () => {
  return (
    <ProveedorAutenticacion>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Inicio/>}  />
          <Route path="/iniciar"  element = {< Iniciar />} />
          <Route path="/panel"  element = {<Panel />} />
          <Route path="/registrar"  element = {<Registrar />} />
          <Route path="/perfil" element={<Perfil />} />

        </Routes>
      </BrowserRouter>
    </ProveedorAutenticacion>
  )
}

export default App