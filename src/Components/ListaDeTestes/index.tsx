import { useEffect, useMemo, useState } from "react";
import { getAllListaTestes } from "../../Services/testesServices";
import { IGrupo, ISubGrupo, ITeste } from "../../Interfaces/ITestes";
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
  const subGruposFiltrados = useMemo(() => {
    return subGrupos.filter(subgrupo =>
      subgrupo.grupoId === grupoSelecionado || (subgrupo.grupo && subgrupo.grupo._id === grupoSelecionado)
    );
  }, [subGrupos, grupoSelecionado]);

  // Filtragem de itens baseada nos valores dos selects de grupo e subgrupo
  const testesFiltrados = testes.filter(({ grupo, subGrupo }) =>
    (!grupoSelecionado || grupo._id === grupoSelecionado) &&
    (!subGrupoSelecionado || subGrupo._id === subGrupoSelecionado)
  );

  // Função para mudar campo de resultados de um teste
  const handleChange = async (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setTestes((prevTestes) =>
        prevTestes.map((teste) =>
          teste._id === id ? { ...teste, resultado: e.target.value } : teste
        ));
    } catch (error) {
      console.log(error);
    }
  };

  // Função para mudar campo de observaçao de um teste
  const handleChangeObs = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setTestes((prevTestes) =>
        prevTestes.map((teste) =>
          teste._id === id ? { ...teste, observacao: e.target.value } : teste
        ));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findAllTestAttributes();
  }, []);

  return (
    <TableListTests
      title="Lista de Testes"
      listaCabecalho={HEAD_TABLE}
      listaDe={testesFiltrados}
      onchangeResult={handleChange}
      onchangeObservation={handleChangeObs}
      opcoes={
        <span className="flex gap-2">
          <button className="bg-green-400 rounded-lg px-3 py-1 text-zinc-50">Salvar</button>
          <button className="bg-red-400 rounded-lg px-3 py-1 text-zinc-50">Excluir</button>
        </span>
      }>

      <div className="max-w-md m-2 flex gap-5">
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
