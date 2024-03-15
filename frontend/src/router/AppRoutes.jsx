import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login  from "../pages/Login";
import Registro  from "../pages/Registro";
import Explorar from "../pages/Explorar";
import PublicRoutes from "./PublicRoutes";
import Mensajes from "../pages/Mensajes";
import NotFound from "../pages/404";
import Perfil from "../pages/Perfil";
import PrivateRoutes from "./PrivateRoutes";
import UserProfile from "../pages/UserProfile";
import Valoracion from "../pages/Valoracion";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoutes/>}>
                    <Route path="/login" element={<Login/> }/>
                    <Route path="/registro" element={<Registro/>}/>
                </Route>

                <Route path="/:username" element={<UserProfile/>}/>
                <Route path="/valoracion/:codigo" element={<Valoracion/>}/>

                <Route element={<PrivateRoutes/>}>
                    <Route path="/miperfil" element={<Perfil/>}/>
                    <Route path="/mensajes" element={<Mensajes/>}/>
                </Route>

                <Route path="/" element={<Landing/>}/>
                <Route path="/explorar" element={<Explorar/>}/>


                <Route path="/notfound" element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes