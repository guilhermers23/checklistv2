import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { RootReducer } from "../../store";
import { clearUser, setUser } from "../../store/reducers/user";
import { useLoggedUserQuery } from "../../services/userService";
import { MessagemToastify, Toastify } from "../Toastify";
import MenuDrop from "../MenuDrop";
import DarkMode from "../ModoDark";
import Footer from "../Footer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: loggedUser, isError } = useLoggedUserQuery();
  const { user } = useSelector((state: RootReducer) => state.user);

  const userLogout = () => {
    MessagemToastify("Usuário deslogado com sucesso", "success");
    dispatch(clearUser());
    Cookies.remove("token");
    navigate("/");
  };

  // 🔑 Atualiza quando o loggedUser chegar
  useEffect(() => {
    if (Cookies.get("token") && loggedUser) {
      dispatch(setUser(loggedUser));
    }
  }, [loggedUser, dispatch]);

  // 🔑 Feedback de erro da query
  useEffect(() => {
    if (isError) {
      MessagemToastify("Ocorreu erro ao buscar Usuário!", "error");
    }
  }, [isError]);

  return (
    <>
      <Toastify />
      <header className="flex h-20 self-center justify-between bg-sky-500 text-white px-4 w-full items-center">
        <Link to="/" className="flex items-center gap-2">
          <CheckBadgeIcon className="size-10" />
          <h1 className="text-2xl font-bold text-nowrap">CHECKLIST V2.0</h1>
        </Link>
        <nav>
          <section className="flex items-center gap-10">
            <DarkMode />
            {user?.admin &&
              <p className="font-bold text-red-400 px-2 bg-sky-300 rounded-2xl">Admin</p>
            }
            <span className="flex items-center gap-2">
              <h1 className="text-2xl">Olá, {user?.name || "Técnico(a)"}</h1>
              {user
                ? (
                  <MenuDrop
                    hasAdmin={!user.admin}
                    onClick={userLogout}
                  />
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-sky-100 py-1 px-5 rounded-lg text-gray-900 font-Kanit active:bg-green-400 hover:shadow-md hover:shadow-gray-400 hover:animate-pulse hover:bg-gradient-to-r hover:from-sky-300 cursor-pointer"
                  >
                    Entrar
                  </button>
                )
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
