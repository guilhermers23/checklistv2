import { Link, Outlet } from "react-router-dom";
import MenuDrop from "../MenuDrop";
import ModoDark from "../ModoDark";

export default function Header() {
  return (
    <>
      <header className="flex h-20 self-center justify-between bg-sky-500 text-white px-4 w-ful items-center">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">CHECKLIST</h1>
        </Link>
        <nav>
          <section className="flex items-center gap-10">
            <ModoDark />
            <span className="flex items-center gap-2">
              <h1 className="text-2xl">Olá, usuário</h1>
              <MenuDrop />
            </span>
          </section>
        </nav>
      </header>

      <Outlet />
    </>
  );
};
