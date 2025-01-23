import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function DarkMode() {
  const elementDocumento: DOMTokenList = document.documentElement.classList;

  const toggleMode = (): void => {
    elementDocumento.toggle("dark");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      elementDocumento.add("dark");
  });

  return (
    <span className="hidden sm:block cursor-pointer" onClick={toggleMode}>
      <MoonIcon className="block h-10 text-gray-50 dark:hidden"/>
      <SunIcon className="hidden h-10 text-gray-50 dark:block" />
    </span>
  );
};
