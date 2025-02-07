import { ReactNode } from "react"
import { ITeste } from "../../../Interfaces/ITestes";
import { DadosSessao } from "../../../API/sessionService";
import ModalCadastro from "../../ModalCadastros";
import AddGrupo from "../../Form/AddGrupo";
import AddSubGrupo from "../../Form/AddSubGrupo";
import Loading from "../../../../public/loading.png";

interface PropsTableDefault {
    children?: ReactNode;
    listaCabecalho: string[];
    listaDe: ITeste[];
    title: string;
    hasUser: boolean;
    admin: boolean;
    hasGruposSelecionado: string;
    loading: boolean;
    hasSession: DadosSessao | undefined;
    onchangeResult?: (id: string, e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> | undefined;
    onchangeObservation?: (id: string, e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | undefined;
    onchangeReset?: () => void | undefined;
    buttonSave: (id: string, resultado: string, observacao: string | undefined) => void;
    buttonDelete: (id: string) => void;
    startSession: () => void;
    finishTest: () => void;
};

export default function TableListTests(
    { children, listaCabecalho, listaDe, hasSession,
        loading, title, hasUser, admin, hasGruposSelecionado,
        buttonDelete, onchangeResult, onchangeObservation,
        onchangeReset, buttonSave, startSession, finishTest }: PropsTableDefault) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/10 m-auto my-10">
            <div className="flex justify-between items-center m-2">
                <h1 className="text-xl">{title}</h1>

                {!hasUser &&
                    <ModalCadastro title="Adicionar Grupos">
                        <AddGrupo />
                        <AddSubGrupo />
                    </ModalCadastro>
                }
            </div>

            {children}

            <div className="m-2 flex gap-5">
                <button className="button bg-green-500 disabled:bg-green-300"
                    disabled={!hasGruposSelecionado || hasUser || listaDe.length === 0}
                    onClick={() => startSession()}>Iniciar Testes</button>

                <button className="button bg-yellow-500 disabled:bg-yellow-300"
                    disabled={!hasGruposSelecionado || hasUser || listaDe.length === 0}
                    onClick={() => onchangeReset && onchangeReset()}>Resetar Testes</button>
            </div>

            {loading ?
                <span className="flex justify-center gap-2 items-center font-Kanit m-5 dark:text-gray-200">
                    <img className="size-10 animate-spin"
                        src={Loading} alt="" />
                    Carregando testes...
                </span> :
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
                            <tr key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
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
                                <td className="py-4 px-2 w-15">
                                    <span className="flex gap-2 justify-around">
                                        <button className="button disabled:bg-green-400/25 disabled:cursor-not-allowed bg-green-400"
                                            onClick={() => buttonSave(item._id, item.resultado, item.observacao)}
                                            disabled={hasUser}>Salvar</button>

                                        {!admin &&
                                            <button className="button bg-red-400"
                                                onClick={() => buttonDelete(item._id)}>Excluir</button>
                                        }
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {listaDe.length === 0 &&
                        <p className="text-2xl m-5 flex justify-center">Nenhum teste encontrado</p>
                    }
                </table>
            }

            {hasSession &&
                <button className="button bg-red-500 mt-2"
                    onClick={() => finishTest()}>Finalizar Teste</button>
            }
        </div>
    )
};
