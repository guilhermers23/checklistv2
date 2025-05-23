import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Hooks/Context/UserContex";
import { loggedUser } from "../../API/loogerUserService";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";
import MenuDrop from "../MenuDrop";
import ModoDark from "../ModoDark";
import Footer from "../Footer";

const Header = () => {
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
    } catch (error) {
      console.error(error);
      alert("Ocorreu erro ao buscar Usuário!")
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) userLogged();
  }, []);

  return (
    <>
      <header className="flex h-20 self-center justify-between bg-sky-500 text-white px-4 w-full items-center">
        <Link to="/" className="flex items-center gap-2">
          <CheckBadgeIcon className="size-10" />
          <h1 className="text-2xl font-bold text-nowrap">CHECKLIST V2.0</h1>
        </Link>
        <nav>
          <section className="flex items-center gap-10">
            <ModoDark />
            {user?.admin &&
              <p className="font-bold text-red-400 px-2 bg-sky-300 rounded-2xl">Admin</p>
            }
            <span className="flex items-center gap-2">
              <h1 className="text-2xl">Olá, {user?.name || "Técnico(a)"}</h1>
              {user !== null ?
                <MenuDrop hasAdmin={!user.admin}
                  onClick={userLogout} /> :
                <button onClick={() => navigate("/login")}
                  className="bg-sky-100 py-1 px-5 rounded-lg text-gray-900 font-Kanit active:bg-green-400 hover:shadow-md hover:shadow-gray-400 hover:animate-pulse hover:bg-gradient-to-r hover:from-sky-300 cursor-pointer">
                  Entrar
                </button>
              }
            </span>
          </section>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Header;
