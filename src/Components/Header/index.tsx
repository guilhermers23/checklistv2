import DarkMode from "../ModoDark";
import { Bars4Icon } from "@heroicons/react/20/solid";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between bg-sky-500 text-white px-4 w-ful">
      <h1 className="text-2xl font-bold">CHECKLIST</h1>
      <nav>
        <section className="flex items-center gap-10">
          <DarkMode />
          <span className="flex items-center gap-2">
          <h1 className="text-2xl">Olá, usuário</h1>
          <Bars4Icon className="h-5" />
          </span>
        </section>
      </nav>
    </header>
  );
}
