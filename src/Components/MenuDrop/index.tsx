import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars4Icon, H1Icon } from "@heroicons/react/20/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface PropsMenuDrop {
  onClick: () => void;
};

export default function MenuDrop({ onClick }: PropsMenuDrop) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center gap-2">
          <Bars4Icon
            aria-hidden="true"
            className="-mr-1 size-6 text-gray-100 cursor-pointer"
          />
        </MenuButton>
      </div>

      <MenuItems transition className="menuDrop_menuItems">
        <div className="py-1">
          <MenuItem>
            <Link
              to="/addGrupo"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <span className="flex items-center gap-2">
                <H1Icon className="size-5" />
                Cadastrar Grupo
              </span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/addSubGrupo"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <span className="flex items-center gap-2">
                <H1Icon className="size-5" />
                Cadastrar SubGrupo
              </span>
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Archive
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Move
            </a>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Share
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Add to favorites
            </a>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <button
              className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer hover:bg-red-400"
              onClick={onClick}
            >
              <span className="flex items-center gap-2">
                <ArrowLeftEndOnRectangleIcon className="size-5" />
                Sair
              </span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
