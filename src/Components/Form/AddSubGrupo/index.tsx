import { FormEvent, useEffect, useState } from "react";
import { IGrupo } from "../../../Interfaces/ITestes";
import { MessagemToastify } from "../../Toastify";
import Input from "../../Input";
import Button from "../../Button";

const AddSubGrupo = () => {
  const [subGrupo, setSubGrupo] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [grupos, setGrupos] = useState<IGrupo[]>([]);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (!grupoId) {
      MessagemToastify("Campo Grupo não pode está vazio!", "error");
      return;
    }

    try {
      const resSubGrupoNome = { nome: subGrupo[0].toUpperCase() + subGrupo.substring(1), grupoId };
      await postSubGrupo(resSubGrupoNome);
      MessagemToastify('SubGrupo cadastrado com sucesso!', "success");
      setGrupoId("");
      setSubGrupo("");
    } catch (error) {
      console.error(error)
      MessagemToastify("Ocorreu erro ao cadastrar o subgrupo!", "error")
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
    <div className="my-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6 my-5"
      >

        <h1 className="dark:text-gray-900">Cadastrar SubGrupo</h1>
        <Input
          id="subGrupo"
          label="SubGrupo"
          placeholder="Adicionar subgrupo..."
          type="text"
          setValor={setSubGrupo}
          value={subGrupo}
        />

        <div className="w-10/12">
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
        <Button type="submit"
          disabled={false}
        >Adicionar Subgrupo</Button>
      </form>
    </div>
  );
};

export default AddSubGrupo;
