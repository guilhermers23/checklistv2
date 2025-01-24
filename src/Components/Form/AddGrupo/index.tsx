import { FormEvent, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";

export default function AddGrupo() {
  const [grupo, setGrupo] = useState("");

  const handeSubmit = (event: FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    console.log({ grupo });
  };

  return (
    <div className="m-auto mt-20 flex bg-gray-100 w-10/12 p-2 rounded-lg lg:w-7/12 dark:bg-gray-800 justify-center">
      <form
        onSubmit={handeSubmit}
        className="w-10/12 flex flex-col items-center justify-center gap-6"
      >
        <h1>Cadastrar Grupo</h1>
        <Input
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
};
