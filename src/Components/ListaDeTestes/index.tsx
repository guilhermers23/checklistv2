import { useEffect, useState } from "react";
import { getAllListaTestes } from "../../Services/testesServices";
import { IGrupo, ISubGrupo, ITeste } from "../../Interfaces/Testes";
import { getAllGrupos, getAllSubGrupos } from "../../Services/gruposServices";
import InputFilter from "../InputFilter";
import TableListTests from "../TableListTests";

export default function ListaDeTestes() {
  const [testes, setTestes] = useState<ITeste[]>([]);
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [subGrupos, setSubGrupos] = useState<ISubGrupo[]>([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState<string>("");
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState<string>("");

  const HEAD_TABLE = [
    "Grupo", "Casos de Uso", "Resultado", "Observações", "Ações"
  ];

  const findAllTestAttributes = async () => {
    try {
      const dataGrupos = await getAllGrupos();
      const dataSubGrupos = await getAllSubGrupos();
      const dataTests = await getAllListaTestes();

      setGrupos(dataGrupos.data);
      setSubGrupos(dataSubGrupos.data);
      setTestes(dataTests.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter as informações! ", error)
    }
  };

  const handleGrupoSelecionado = (newValue: string) => {
    setGrupoSelecionado(newValue);
  };

  const handleSubGrupoSelecionado = (newValue: string) => {
    setSubGrupoSelecionado(newValue);
  };

  // Filtrar os subgrupos com base no grupo selecionado
  const subGruposFiltrados = subGrupos.filter(subgrupo =>
    subgrupo.grupoId === grupoSelecionado || (subgrupo.grupo && subgrupo.grupo._id === grupoSelecionado)
  );

  // Filtragem de itens baseada nos valores dos selects de grupo e subgrupo
  const testesFiltrados = testes.filter((item) => {
    const grupoValido = grupoSelecionado ? item.grupo._id === grupoSelecionado : true;
    const subGrupoValido = subGrupoSelecionado ? item.subGrupo._id === subGrupoSelecionado : true;
    return grupoValido && subGrupoValido;
  });

  useEffect(() => {
    findAllTestAttributes();
  }, []);

  return (
    <TableListTests
      title="Lista de Testes"
      listaCabecalho={HEAD_TABLE}
      listaDe={testesFiltrados}
      opcoes={
        <>
          <button className="bg-sky-400 rounded-lg px-2 text-zinc-50">Salvar</button>
          <button className="bg-red-400 rounded-lg px-2 text-zinc-50">Excluir</button>
        </>
      }>

      <div className="max-w-sm m-2 flex gap-5">
        <InputFilter id="grupo"
          labelTitulo="Grupo"
          listaDe={grupos}
          selectText="Todos os Grupos..."
          value={grupoSelecionado}
          setValor={handleGrupoSelecionado} />

        <InputFilter id="subGrupo"
          labelTitulo="SubGrupo"
          listaDe={subGruposFiltrados}
          selectText="Todos subgrupos..."
          value={subGrupoSelecionado}
          setValor={handleSubGrupoSelecionado}
          disabled={!grupoSelecionado} />
      </div>

    </TableListTests>
  );
};
