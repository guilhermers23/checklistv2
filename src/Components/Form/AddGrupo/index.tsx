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
    <div>
      <form
        onSubmit={handeSubmit}
        className="flex flex-col items-center justify-center gap-6"
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
}
