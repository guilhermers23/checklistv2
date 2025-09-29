import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./Pages/Error/Error404";
import Headers from "./Components/Header";
import Home from "./Pages/Home";
import RegisterForm from "./Pages/Register";
import ListaDeUsuarios from "./Pages/ListaDeUsuarios";
import ListaDeSessoes from "./Pages/ListaDeSessoes";
import Login from "./Pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/" element={<Headers />}>
          <Route index element={<Home />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/users" element={<ListaDeUsuarios />}></Route>
          <Route path="/sessions" element={<ListaDeSessoes />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
};

export default AppRoutes;
