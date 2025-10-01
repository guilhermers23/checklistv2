import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MessagemToastify } from "../../components/Toastify";
import { RootReducer } from "../../store";
import {
  useDeleteTesteMutation,
  useGetAllGruposQuery,
  useGetAllSubGruposQuery,
  useGetAllTesteQuery,
  useUpdateTesteMutation,
} from "../../services/testeService";
import TableListTests from "../../components/Tables/TableListTests";
import ModalCadastro from "../../components/ModalCadastros";
import InputFilter from "../../components/InputFilter";
import AddTeste from "../../components/Form/AddTeste";
import AlertErro from "../Error/AlertError";
import { useFinishSessionMutation, usePostSessionMutation } from "../../services/sessionService";


const ListaDeTestes = () => {
  const HEAD_TABLE = ["Grupo", "Casos de Uso", "Resultado", "Observações", "", "Ações"];

  const [testeTemp, setTesteTemp] = useState<ITeste[]>([]);
  const { data: testes, isLoading: loadingTestes } = useGetAllTesteQuery();
  const { data: grupos } = useGetAllGruposQuery();
  const { data: subGrupos } = useGetAllSubGruposQuery();
  const [updateTeste] = useUpdateTesteMutation();
  const [deleteTeste] = useDeleteTesteMutation();
  const [postSession] = usePostSessionMutation();
  const [finishSession] = useFinishSessionMutation();
  const [grupoSelecionado, setGrupoSelecionado] = useState("");
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState("");
  const [resultadoSelecionado, setResultadoSelecionado] = useState("");
  const [sessionAtiva, setSessionAtiva] = useState<IDadosSessao>();
  const { user } = useSelector((state: RootReducer) => state.user);

  const handleGrupoSelecionado = (newValue: string) => {
    localStorage.setItem("grupoSelecionado", newValue);
    setGrupoSelecionado(newValue);
  };

  const handleSubGrupoSelecionado = (newValue: string) => {
    localStorage.setItem("subgrupoSelecionado", newValue);
    setSubGrupoSelecionado(newValue);
  };

  const gruposFiltrado = useMemo(() => {
    if (!grupos) return [];
    return grupos;
  }, [grupos]);
  // Memoized values should be called unconditionally
  const subGruposFiltrados = useMemo(() => {
    if (!subGrupos) return [];
    return subGrupos.filter(
      (subgrupo) =>
        subgrupo.grupoId === grupoSelecionado ||
        (subgrupo.grupo && subgrupo.grupo._id === grupoSelecionado)
    );
  }, [subGrupos, grupoSelecionado]);

  const testesFiltrados = useMemo(() => {
    if (!testes) return [];
    return testeTemp.filter(
      ({ grupo, subGrupo, resultado }) =>
        (!grupoSelecionado || grupo._id === grupoSelecionado) &&
        (!subGrupoSelecionado || subGrupo._id === subGrupoSelecionado) &&
        (!resultadoSelecionado || resultado === resultadoSelecionado)
    );
  }, [testes, testeTemp, grupoSelecionado, subGrupoSelecionado, resultadoSelecionado]);

  const nomeGrupo = useMemo(() => {
    if (!grupos) return "Grupo não encontrado";
    return grupos.find((g) => g._id === grupoSelecionado)?.nome || "";
  }, [grupos, grupoSelecionado]);

  const nomeSubGrupo = useMemo(() => {
    if (!subGrupos) return "";
    return subGrupos.find((s) => s._id === subGrupoSelecionado)?.nome || "";
  }, [subGrupos, subGrupoSelecionado]);

  // Inicializa testeTemp quando testes chegam
  useEffect(() => { if (testes) setTesteTemp(testes) }, [testes]);

  const handleChange = async (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    setTesteTemp((prev) =>
      prev.map((teste) => (teste._id === id ? { ...teste, resultado: e.target.value } : teste))
    );
  };

  const handleChangeObs = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setTesteTemp((prev) =>
      prev.map((teste) => (teste._id === id ? { ...teste, observacao: e.target.value } : teste))
    );
  };

  const resetarTestes = () => {
    setTesteTemp((prev) =>
      prev.map((teste) => ({ ...teste, resultado: "Não Testado", observacao: "" }))
    );
  };

  const functionSaveTest = async (id: string, resultado: string, observacao: string | undefined) => {
    try {
      const data = { id, resultado, observacao };
      await updateTeste(data);
      MessagemToastify("Teste salvo com Sucesso!", "success");
    } catch (error) {
      console.error(error);
      MessagemToastify("Ocorreu erro ao salvar o Teste!", "error");
    }
  };

  const functionDeleteTest = async (id: string) => {
    try {
      await deleteTeste(id);
      MessagemToastify("Teste excluído com Sucesso!", "success");
    } catch (error) {
      console.error(error);
      MessagemToastify("Ocorreu erro ao excluir o teste!", "error");
    }
  };

  const iniciarTestes = async () => {
    if (!user?._id) {
      MessagemToastify("É necessário estar logado para iniciar a sessão!", "error");
      return;
    };

    const dadosSession = {
      grupo: nomeGrupo,
      subGrupo: nomeSubGrupo,
      tecnico: user._id,
      testes: testesFiltrados
    };

    const res = await postSession(dadosSession);
    if ("error" in res) {
      MessagemToastify("Ocorreu erro ao tentar iniciar essa sessão!", "error");
      console.error("Erro ao iniciar a sessão de testes:");
      return;
    };
    MessagemToastify("Sessão de testes iniciada!", "success");
    setSessionAtiva(res.data);
  };

  const finalizarTestes = async () => {
    if (!sessionAtiva) return;
    if (testesFiltrados.some((t) => t.resultado === "Não Testado")) {
      MessagemToastify(
        "Não é possível finalizar teste com Resultado como 'Não Testado'",
        "error"
      );
      return;
    };

    // const testesAtualizados = testesFiltrados.map((teste) => ({
    //   _id: teste._id,
    //   description: teste.description,
    //   resultado: teste.resultado,
    //   observacao: teste.observacao
    // }));

    const sessionId = sessionAtiva._id;
    const data = { sessionId, testesAtualizados: testesFiltrados };
    const res = await finishSession(data);
    if ("error" in res) {
      MessagemToastify("Erro ao finalizar a sessão.", "error");
      console.error("Erro ao finalizar a sessão de testes:");
      return;
    };

    MessagemToastify("Sessão de testes finalizada!", "success");
    setSessionAtiva(undefined);

  };

  const saveFilter = () => {
    const grupoTemp = localStorage.getItem("grupoSelecionado");
    const subgrupoTemp = localStorage.getItem("subgrupoSelecionado");
    setGrupoSelecionado(grupoTemp || "");
    if (grupoTemp) {
      setSubGrupoSelecionado(subgrupoTemp || "");
    } else {
      localStorage.removeItem("subgrupoSelecionado");
    }
  };

  useEffect(() => { saveFilter() }, []);

  return (
    <TableListTests
      title="Lista de Testes"
      listaCabecalho={HEAD_TABLE}
      listaDe={testesFiltrados}
      hasUser={!user}          // ✅ Corrigido
      admin={!user?.admin}
      loading={loadingTestes}
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
        <InputFilter
          id="grupo"
          labelTitulo="Grupo"
          listaDe={gruposFiltrado}
          selectText="Todos os Grupos..."
          value={grupoSelecionado}
          setValor={handleGrupoSelecionado}
        />

        <InputFilter
          id="subGrupo"
          labelTitulo="SubGrupo"
          listaDe={subGruposFiltrados}
          selectText="Todos subgrupos..."
          value={subGrupoSelecionado}
          setValor={handleSubGrupoSelecionado}
          disabled={!grupoSelecionado}
        />

        <div className="w-full">
          <label
            htmlFor="resultado"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Resultado
          </label>
          <select
            id="resultado" // ✅ corrigido
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event) => setResultadoSelecionado(event.target.value)}
            value={resultadoSelecionado}
          >
            <option value="">Todas</option>
            <option value="Não Testado">Não Testado</option>
            <option value="Passou">Passou</option>
            <option value="Não Passou">Não Passou</option>
          </select>
        </div>

        <div className="w-full content-center">
          {subGrupoSelecionado && (
            <ModalCadastro title="Adicionar Teste">
              {user ? (
                <AddTeste grupo={grupoSelecionado} subgrupo={subGrupoSelecionado} />
              ) : (
                <AlertErro />
              )}
            </ModalCadastro>
          )}
        </div>

        <span className="w-full content-center text-xl font-Oswald dark:text-blue-50">
          Total de Testes: {testesFiltrados.length}
        </span>
      </div>
    </TableListTests>
  );
};

export default ListaDeTestes;
