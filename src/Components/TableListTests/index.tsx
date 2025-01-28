import { ReactNode } from "react"
import { ITeste } from "../../Interfaces/Testes";

interface PropsTableDefault {
    children?: ReactNode;
    listaCabecalho: string[];
    listaDe: ITeste[];
    opcoes: ReactNode;
    title: string;
};

export default function TableListTests({ children, listaCabecalho, listaDe, opcoes, title }: PropsTableDefault) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/10 m-auto my-10">
            <h1>{title}</h1>
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
                            <td className="px-6 py-4">
                                {item.resultado}
                            </td>
                            <td className="px-6 py-4">
                                {item.observacao}
                            </td>
                            <td className="px-6 py-4 text-right flex gap-2">
                                {opcoes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};