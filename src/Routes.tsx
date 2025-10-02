import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "../src/pages/Error/Error404";
import Headers from "./components/Header";
import RegisterForm from "../src/pages/Register";
import ListaDeUsuarios from "../src/pages/ListaDeUsuarios";
import ListaDeSessoes from "../src/pages/ListaDeSessoes";
import ListaDeTestes from "./pages/ListaDeTestes";
import Login from "../src/pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/" element={<Headers />}>
          <Route index element={<ListaDeTestes />}></Route>
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
