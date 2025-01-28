import { IGrupo } from "../../Interfaces/ITestes"

interface PropsInputFilter {
    listaDe: IGrupo[];
    selectText: string;
    labelTitulo: string
    id: string;
    disabled?: boolean;
    value: string;
    setValor: (e: string) => void;
};

export default function InputFilter({ listaDe, selectText, labelTitulo, id, setValor, disabled, value }: PropsInputFilter) {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {labelTitulo}
            </label>
            <select id={id} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => setValor(event.target.value)}
                value={value}
                disabled={disabled}
            >
                <option value="">{selectText}</option>
                {listaDe.map((grupo) => (
                    <option key={grupo._id} value={grupo._id}>{grupo.nome}</option>
                ))}
            </select>
        </div>
    )
};
