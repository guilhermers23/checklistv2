import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Hooks/Context/UserContex";
import { loggedUser } from "../../API/loogerUserService";
import Cookies from "js-cookie";
import MenuDrop from "../MenuDrop";
import ModoDark from "../ModoDark";
import Footer from "../Footer";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const userLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/")
  };

  const userLogged = async () => {
    try {
      const response = await loggedUser();
      delete response.data.password;
      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ocorreu erro ao buscar Usuário!")
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) userLogged();
    if (!Cookies.get("token")) userLogout();
  }, []);

  return (
    <>
      <header className="flex h-20 self-center justify-between bg-sky-500 text-white px-4 w-full items-center">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">CHECKLIST V2.0</h1>
        </Link>
        <nav>
          <section className="flex items-center gap-10">
            <ModoDark />
            <span className="flex items-center gap-2">
              <h1 className="text-2xl">Olá, {user?.name || "Técnico(a)"}</h1>
              <MenuDrop onClick={userLogout} />
            </span>
          </section>
        </nav>
      </header>

      <Outlet />

      <Footer />
    </>
  );
};
