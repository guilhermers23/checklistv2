import { BrowserRouter, Route, Routes } from "react-router-dom";
import Headers from "./Components/Header";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error/Error404";
import Login from "./Pages/Login";
import RegisterForm from "./Pages/Register";
import TableUsers from "./Components/Tables/TableUsers";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/" element={<Headers />}>
          <Route index element={<Home />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/users" element={<TableUsers />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
};
