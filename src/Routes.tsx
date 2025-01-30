import { createBrowserRouter } from "react-router-dom";
import Headers from "./Components/Header";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error/Error404";
import Login from "./Pages/Login";
import RegisterForm from "./Pages/Register";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Headers />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
    { path: "/login", element: <Login /> },
]);
