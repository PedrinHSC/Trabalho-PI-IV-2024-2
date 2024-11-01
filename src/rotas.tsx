import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/telaLogin/login";
import TelaInicial from "./pages/telaInicial/telaInicial";
import DetalhesMateria from './pages/telaInicial/componentes/materias/detalheMateria/detalheMateria'

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicio/*" element={<TelaInicial />} />
                <Route path="/:turma/:materia/*" element={<DetalhesMateria />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas