import { FormEvent, useEffect, useState } from "react";
import { getAllGrupos, postSubGrupo } from "../../../API/gruposServices";
import { IGrupo } from "../../../Interfaces/ITestes";
import Input from "../../Input";
import Button from "../../Button";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function AddSubGrupo() {
  const [subGrupo, setSubGrupo] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [grupos, setGrupos] = useState<IGrupo[]>([]);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const resSubGrupoNome = { nome: subGrupo[0].toUpperCase() + subGrupo.substring(1), grupoId };
      console.log(resSubGrupoNome);
      await postSubGrupo(resSubGrupoNome);
      alert('SubGrupo cadastrado com sucesso!');
      setGrupoId("");
      setSubGrupo("");
    } catch (error) {
      console.error(error)
      alert("Ocorreu erro ao cadastrar o subgrupo!")
    }
  };

  const findAllGrupos = async () => {
    try {
      const dataGrupos = await getAllGrupos();
      setGrupos(dataGrupos.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter todos os grupos! ", error)
    }
  };

  useEffect(() => {
    findAllGrupos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-5 m-auto mx-10 content-center">
      <h1>Cadastrar SubGrupo</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col  md:flex-row items-center justify-center gap-6 my-5"
      >

        <Input
          id="subGrupo"
          label="SubGrupo"
          placeholder="Adicionar subgrupo..."
          type="text"
          setValor={setSubGrupo}
          value={subGrupo}
        />

        <ChevronDoubleRightIcon className="size-10 pt-4 md:block hidden"/>

        <div className="w-6/10">
          <label htmlFor="grupo" className="block font-Oswald dark:text-gray-400">
            Associe a um Grupo
          </label>
          <select id='grupo' className="login_input"
            onChange={(event) => setGrupoId(event.target.value)}
            value={grupoId}
          >
            <option value="">Associar subgrupo...</option>
            {grupos.map((grupo) => (
              <option key={grupo._id} value={grupo._id}>{grupo.nome}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
    </div>
  );
};
