import { FormEvent, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";

const AddGrupo = () => {
  const [grupo, setGrupo] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(loading)

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    try {
      const resGrupoNome = { nome: grupo[0].toUpperCase() + grupo.substring(1) };
      await postGrupo(resGrupoNome);
      alert('Grupo cadastrado com sucesso!');
      setGrupo("");
    } catch (error) {
      console.error(error)
      alert("Ocorreu erro ao cadastrar o grupo!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 shadow-md pb-5">
      <form
        onSubmit={handeSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <h1 className="dark:text-gray-800">Cadastrar Grupo</h1>
        <Input
          id="grupo"
          label="Grupo"
          placeholder="Adicione um grupo..."
          type="text"
          setValor={setGrupo}
          value={grupo}
        />
        <Button type="submit" disabled={loading}>
          Adicionar Grupo
        </Button>
      </form>
    </div>
  );
};

export default AddGrupo;
