import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function AlertErro({ message }: { message: string }) {
    return (
        <div className="text-center p-5">
            <div className="inline-flex rounded-full bg-red-100 p-4">
                <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                    <ExclamationTriangleIcon className="text-red-400 size-10" />
                </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[40px]">Acesso Negado</h1>
            <p className="text-slate-600 mt-5 lg:text-lg">{message}</p>
        </div>
    )
};
