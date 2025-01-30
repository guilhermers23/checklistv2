import { createBrowserRouter } from "react-router-dom";
import Headers from "./Components/Header";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error/Error404";
import AddGrupo from "./Components/Form/AddGrupo";
import AddSubGrupo from "./Components/Form/AddSubGrupo";
import Login from "./Pages/Login";
import RegisterForm from "./Pages/Register";
import ListaDeTestes from "./Components/ListaDeTestes";
import ModalCadastro from "./Components/ModalCadastros";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Headers />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/addGrupo", element: <AddGrupo /> },
      { path: "/addSubGrupo", element: <AddSubGrupo /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/listaTestes", element: <ListaDeTestes /> },
    ],
  },
    { path: "/login", element: <Login /> },
    { path: "/modal", element: <ModalCadastro /> }
]);
