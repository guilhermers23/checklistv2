import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { IUser } from "../../../Interfaces/IUser";
interface PropsTable {
    users: IUser[],
    buttonDelete: (id: string) => void;
};

const TableUsers = ({ users, buttonDelete }: PropsTable) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/10 mx-auto my-5">
            <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">

                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none" >
                        <MagnifyingGlassIcon className="size-5" />
                    </div>
                    <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Digite nome do usuário..." />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Função
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <UserCircleIcon className="size-10" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{user.name}</div>
                                    <div className="font-normal text-gray-500">{user.email}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {user.admin ? "Admin" : "Técnico"}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button className="button bg-red-400"
                                    onClick={() => user._id &&
                                        buttonDelete(user._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
};

export default TableUsers;
