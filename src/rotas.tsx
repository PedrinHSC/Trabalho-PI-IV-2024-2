import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/telaLogin/login";
import TelaInicial from "./pages/telaInicial/telaInicial";


function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicio/*" element={<TelaInicial />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas