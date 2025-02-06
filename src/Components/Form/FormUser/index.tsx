import { FormEvent } from "react";
import Button from "../../Button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface PropsFormUser {
    title: string;
    children: React.ReactNode;
    onsubmit: (event: FormEvent) => Promise<void>;
    buttonTitle: string;
    error: string;
    foto: string;
    loading: boolean;
};

export default function FormUser({ title, children, onsubmit, buttonTitle, error, foto, loading }: PropsFormUser) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800"> {/* Centraliza na tela */}
            <div className="w-10/12 p-2 rounded-lg lg:w-7/12 bg-white dark:bg-gray-700 shadow-md"> {/* Card com fundo branco/escuro e sombra */}
                <div className="flex flex-col md:flex-row"> {/* Layout em coluna para mobile e linha para desktop */}
                    <form
                        onSubmit={onsubmit}
                        className="w-full md:w-6/12 flex flex-col items-center justify-center gap-6 p-4" // Ajuste de largura e padding
                    >
                        <h1 className="font-Oswald font-bold text-lg dark:text-gray-100">
                            {title}
                        </h1>

                        {children}

                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit"
                            disabled={!loading}>
                            {loading ? buttonTitle : (
                                <>
                                    <ArrowPathIcon className="size-5 animate-spin" />
                                    Carregando...
                                </>
                            )}
                        </Button>
                    </form>

                    <img
                        src={foto}
                        alt="Imagem de uma tela de login"
                        className="w-full md:w-6/12 hidden md:block rounded-xl object-cover" // Ajuste de largura e object-cover
                    />
                </div>
            </div>
        </div>
    )
};
