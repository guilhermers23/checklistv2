import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/20/solid";
import { ArrowLeftEndOnRectangleIcon, LockClosedIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface PropsMenuDrop {
  onClick: () => void;
  hasAdmin: boolean;
};

export default function MenuDrop({ onClick, hasAdmin }: PropsMenuDrop) {

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
              to="/register"
              className="block text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <button className="justify-between px-4 py-2 flex items-center w-full gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-100"
                disabled={hasAdmin}>
                <span className="flex gap-1">
                  <UserPlusIcon className="size-5" />
                  Cadastrar Técnico
                </span>
                {hasAdmin && <LockClosedIcon className="size-5" />}
              </button>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/users"
              className="block text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <button className="justify-between px-4 py-2 flex items-center w-full gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-100"
                disabled={hasAdmin}>
                <span className="flex gap-1">
                  <UsersIcon className="size-5" />
                  Lista de Técnicos
                </span>
                {hasAdmin && <LockClosedIcon className="size-5 ml-5" />}
              </button>
            </Link>
          </MenuItem>
        </div>

        {/* <div className="py-1">
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
        </div> */}

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
