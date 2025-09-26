import { BrowserRouter, Route, Routes } from "react-router-dom";
import Headers from "./components/Header";
import Home from "./pages/Home";
import Error404 from "./pages/Error/Error404";
import Login from "./pages/Login";
import RegisterForm from "./pages/Register";
import ListaDeUsuarios from "./pages/ListaDeUsuarios";
import ListaDeSessoes from "./pages/ListaDeSessoes";

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
