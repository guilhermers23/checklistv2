import { FormEvent, useState } from "react";
import Input from "../../Input";
import Button from "../../Button";

export default function AddSubGrupo() {
  const [subGrupo, setSubGrupo] = useState("");

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    console.log({ subGrupo });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <h1>Cadastrar SubGrupo</h1>
        <Input
          label="SubGrupo"
          placeholder="Adicionar subgrupo..."
          type="text"
          setValor={setSubGrupo}
          value={subGrupo}
        />
        <div className="flex gap-4">
          <select name="" id=""></select>
        </div>

        <Button type="submit">Adicionar SubGrupo</Button>
      </form>
    </div>
  );
};
