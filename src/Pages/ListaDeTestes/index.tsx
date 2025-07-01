import { useContext, useEffect, useMemo, useState } from "react";
import { deleteTeste, getAllListaTestes, updateTeste } from "../../API/testesServices";
import { IGrupo, ISubGrupo, ITeste } from "../../Interfaces/ITestes";
import { getAllGrupos, getAllSubGrupos } from "../../API/gruposServices";
import { UserContext } from "../../Hooks/Context/UserContex";
import { finishSession, postSession } from "../../API/sessionService";
import { IDadosSessao } from "../../Interfaces/ISessions";
import InputFilter from "../../Components/InputFilter";
import TableListTests from "../../Components/Tables/TableListTests";
import ModalCadastro from "../../Components/ModalCadastros";
import AddTeste from "../../Components/Form/AddTeste";
import AlertErro from "../Error/AlertError";

export default function ListaDeTestes() {
  const [testes, setTestes] = useState<ITeste[]>([]);
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [subGrupos, setSubGrupos] = useState<ISubGrupo[]>([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState<string>("");
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState<string>("");
  const [resultadoSelecionado, setResultadoSelecionado] = useState("");
  const [sessionAtiva, setSessionAtiva] = useState<IDadosSessao>();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const HEAD_TABLE = [
    "Grupo", "Casos de Uso", "Resultado", "Observações", "", "Ações"
  ];

  const findAllTestAttributes = async () => {
    setLoading(true);
    try {
      const dataGrupos = await getAllGrupos();
      const dataSubGrupos = await getAllSubGrupos();
      const dataTests = await getAllListaTestes();

      setGrupos(dataGrupos.data);
      setSubGrupos(dataSubGrupos.data);
      setTestes(dataTests.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter as informações! ", error)
    } finally {
      setLoading(false);
    }
  };

  const handleGrupoSelecionado = (newValue: string) => {
    localStorage.setItem("grupoSelecionado", newValue);
    setGrupoSelecionado(newValue);
  };
  const handleSubGrupoSelecionado = (newValue: string) => {
    localStorage.setItem("subgrupoSelecionado", newValue);
    setSubGrupoSelecionado(newValue)
  };

  // Filtrar os subgrupos com base no grupo selecionado
  const subGruposFiltrados = useMemo(() => {
    return subGrupos.filter(subgrupo =>
      subgrupo.grupoId === grupoSelecionado || (subgrupo.grupo && subgrupo.grupo._id === grupoSelecionado)
    );
  }, [subGrupos, grupoSelecionado]);

  // Filtragem de itens baseada nos valores dos selects de grupo e subgrupo
  const testesFiltrados = testes.filter(({ grupo, subGrupo, resultado }) =>
    (!grupoSelecionado || grupo._id === grupoSelecionado) &&
    (!subGrupoSelecionado || subGrupo._id === subGrupoSelecionado) &&
    (!resultadoSelecionado || resultado === resultadoSelecionado)
  );

  const nomeGrupo = () => {
    const grupo = grupos.filter(grupo => grupo._id === grupoSelecionado);
    const nome = grupo.map(i => i.nome);
    return nome.toString();
  };

  const nomeSubGrupo = () => {
    const subgrupo = subGrupos.filter(subgrupo => subgrupo._id === subGrupoSelecionado)
    const nome = subgrupo.map(i => i.nome);
    return nome.toString();
  };

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

  const resetarTestes = () => {
    setTestes((prevTestes) =>
      prevTestes.map((teste) => ({ ...teste, resultado: 'Não Testado', observacao: '' }))
    );
  };

  const functionSaveTest = async (id: string, resultado: string, observacao: string | undefined) => {
    try {
      const data = { resultado, observacao }
      await updateTeste(id, data);
      alert("Teste salvo com Sucesso!");
    } catch (error) {
      console.error(error)
      alert("Ocorreu erro ao salvar o Teste!")
    }
  };

  const functionDeleteTest = async (id: string) => {
    setUpdate(false);
    try {
      await deleteTeste(id);
      alert("Teste excluido com Sucesso!")
      setUpdate(true);
    } catch (error) {
      console.error(error);
      alert("Ocorreu erro ao excluir o teste!");
    }
  };

  const iniciarTestes = async () => {
    try {
      const dadosSession = { grupo: nomeGrupo(), subGrupo: nomeSubGrupo(), tecnico: user?._id, testes: testesFiltrados };
      console.log(dadosSession)
      const response = await postSession(dadosSession);
      setSessionAtiva(response.data); // Armazena a sessão iniciada
      alert('Sessão de testes iniciada!');
    } catch (error) {
      console.error('Erro ao iniciar a sessão de testes:', error);
      alert("Ocorreu erro ao tentar inicia essa sessão!");
    }
  };

  const finalizarTestes = async () => {
    try {
      if (!sessionAtiva) return;
      if (testesFiltrados.find(teste => teste.resultado === "Não Testado")) {
        alert("Não é possivel finalizar teste com Resultado como Não Testado")
        return;
      };

      const testesAtualizados = testesFiltrados.map(teste => ({
        _id: teste._id,
        description: teste.description,
        resultado: teste.resultado,
        observacao: teste.observacao,
      }));
      const sessionId = sessionAtiva._id; // ID da sessão ativa
      await finishSession(sessionId, testesAtualizados);
      alert('Sessão de testes finalizada!');
      setSessionAtiva(undefined); // Reseta a sessão ativa

    } catch (error) {
      console.error('Erro ao finalizar a sessão de testes:', error);
      alert("Erro ao finalizar a sessão.");
    }
  };

  useEffect(() => {
    findAllTestAttributes();
    const grupoTemp = localStorage.getItem("grupoSelecionado");
    const subgrupoTemp = localStorage.getItem("subgrupoSelecionado");
    setGrupoSelecionado(grupoTemp || "");
    if (grupoTemp) {
      setSubGrupoSelecionado(subgrupoTemp || "");
    } else {
      localStorage.removeItem("subgrupoSelecionado");
    }
  }, [update]);

  return (
    <TableListTests
      title="Lista de Testes"
      listaCabecalho={HEAD_TABLE}
      listaDe={testesFiltrados}
      hasUser={!user}
      admin={!user?.admin}
      loading={loading}
      hasSession={sessionAtiva}
      hasGruposSelecionado={subGrupoSelecionado}
      onchangeResult={handleChange}
      onchangeObservation={handleChangeObs}
      buttonSave={functionSaveTest}
      buttonDelete={functionDeleteTest}
      onchangeReset={resetarTestes}
      startSession={iniciarTestes}
      finishTest={finalizarTestes}
    >

      <div className="m-2 flex gap-5 justify-between">
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

        <div className="w-full">
          <label htmlFor='resultado' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Resultado
          </label>
          <select id='resutado' className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event) => setResultadoSelecionado(event.target.value)}
            value={resultadoSelecionado}
          >
            <option value="" >Todas</option>
            <option value="Não Testado">Não Testado</option>
            <option value="Passou">Passou</option>
            <option value="Não Passou">Nâo Passou</option>
          </select>
        </div>

        <div className="w-full content-center">
          {subGrupoSelecionado &&
            <ModalCadastro title="Adicionar Teste">
              {user ?
                <AddTeste
                  grupo={grupoSelecionado}
                  subgrupo={subGrupoSelecionado}
                /> :
                <AlertErro />
              }
            </ModalCadastro>
          }
        </div>
        <span className="w-full content-center text-xl font-Oswald dark:text-blue-50">Total de Testes: {testesFiltrados.length}</span>
      </div>
    </TableListTests>
  );
};
