import { FormEvent, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import { postTeste } from "../../../API/testesServices";

export default function AddTeste(body: { grupo: string, subgrupo: string }) {
    const [description, setDescription] = useState("");

    const handeSubmit = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const testeData = {
            grupoID: body.grupo, // Nome do grupo
            subGrupoID: body.subgrupo, // Nome do subgrupo
            description: description[0].toUpperCase() + description.substring(1),
            resultado: "Não Testado", // Campo fixo
            observacao:""
        };

        try {
            await postTeste(testeData);
            alert("Teste adicionado com Sucesso!")
            setDescription('');
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <div className="my-5 shadow-md pb-5">
                <form
                    onSubmit={handeSubmit}
                    className="flex flex-col items-center justify-center gap-6"
                >
                    <h1 className="dark:text-gray-800">Adicionar Teste</h1>
                    <Input id="teste"
                        type="text"
                        label="Casos de Uso"
                        placeholder="Descreva o testa a ser feito..."
                        setValor={setDescription}
                        value={description}
                    />
                    <Button type="submit">Adicionar Teste</Button>
                </form>
            </div>
        </>
    )
};
