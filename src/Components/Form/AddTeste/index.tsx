import { FormEvent, useState } from "react";
import { postTeste } from "../../../API/testesServices";
import Button from "../../Button";
import Input from "../../Input";

export default function AddTeste(body: { grupo: string, subgrupo: string }) {
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState("");
    const [loading, setLoading] = useState(false);

    const handeSubmit = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setLoading(true);

        const testeData = {
            grupoID: body.grupo,
            subGrupoID: body.subgrupo,
            description: description[0].toUpperCase() + description.substring(1),
            resultado: "Não Testado", // Campo fixo
            observacao: "",
            files: files
        };

        try {
            await postTeste(testeData);
            alert("Teste adicionado com Sucesso!")
            setDescription('');
            setFiles('');
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-5 pb-5">
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

                <Input id="link"
                    label="Link"
                    placeholder="Link para manual..."
                    type="text"
                    setValor={setFiles}
                    value={files}
                    required={false}
                >

                </Input>
                <Button type="submit"
                    disabled={loading}>
                    Adicionar Teste
                </Button>
            </form>
        </div>
    )
};
