import { FormEvent, useState } from "react";
import { postGrupo } from "../../../API/gruposServices";
import Button from "../../Button";
import Input from "../../Input";

export default function AddGrupo() {
  const [grupo, setGrupo] = useState("");

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const resGrupoNome = { nome: grupo[0].toUpperCase() + grupo.substring(1) };
      console.log(resGrupoNome);
      await postGrupo(resGrupoNome);
      alert('Grupo cadastrado com sucesso!');
      setGrupo("");
    } catch (error) {
      console.error(error)
      alert("Ocorreu erro ao cadastrar o grupo!")
    }
  };

  return (
    <div>
      <form
        onSubmit={handeSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <h1>Cadastrar Grupo</h1>
        <Input
          id="grupo"
          label="Grupo"
          placeholder="Adicione um grupo..."
          type="text"
          setValor={setGrupo}
          value={grupo}
        />
        <Button type="submit">Adicionar Grupo</Button>
      </form>
    </div>
  );
}
