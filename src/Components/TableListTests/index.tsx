import { ReactNode } from "react"
import { ITeste } from "../../Interfaces/ITestes";
import ModalCadastro from "../ModalCadastros";

interface PropsTableDefault {
    children?: ReactNode;
    listaCabecalho: string[];
    listaDe: ITeste[];
    opcoes: ReactNode;
    title: string;
    onchangeResult?: (id: string, e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> | undefined;
    onchangeObservation?: (id: string, e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | undefined;
};

export default function TableListTests({ children, listaCabecalho, listaDe, opcoes, title, onchangeResult, onchangeObservation }: PropsTableDefault) {
    return (
        <main className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/10 m-auto my-10">
            <div className="flex justify-between items-center m-2">
            <h1 className="text-xl">{title}</h1>
            <ModalCadastro />
            </div>
            {children}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {listaCabecalho.map((head) => (
                            <th scope="col" className="px-6 py-3" key={head}>
                                {head}
                            </th>))}
                    </tr>
                </thead>
                <tbody>
                    {listaDe.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={item._id}>
                                {item.grupo.nome}
                            </th>
                            <td className="px-6 py-4">
                                {item.description}
                            </td>
                            <td className="px-2 py-4">
                                <label htmlFor="resultado" className="sr-only">
                                    Resultado
                                </label>
                                <select id="resultado" className="block py-2.5 px-1 w-full text-sm text-gray-950 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    value={item.resultado}
                                    onChange={(e) => onchangeResult && onchangeResult(item._id, e)}
                                >
                                    <option value="Não Testado">Não Testado</option>
                                    <option value="Passou">Passou</option>
                                    <option value="Não Passou">Não Passou</option>
                                </select>
                            </td>
                            <td className="px-2 py-4 w-2/10">
                                <div className="md:w-9/12">
                                    <label htmlFor="text"
                                        className="block font-Oswald dark:text-gray-400">
                                    </label>
                                    <input className="login_input"
                                        id="obs"
                                        type="text"
                                        placeholder="Observações..."
                                        value={item.observacao}
                                        onChange={(e) => onchangeObservation && onchangeObservation(item._id, e)}
                                    />
                                </div>

                            </td>
                            <td className="py-4 px-2">
                                {opcoes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
};
