import { useContext } from "react";
import { UserContext } from "../../Hooks/Context/UserContex";
import TableListTests from "../../Components/Tables/TableListTests";
import useListTest from "../../Hooks/ListaTestes/useListTests";
import ModalCadastro from "../../Components/ModalCadastros";
import InputFilter from "../../Components/InputFilter";
import AddTeste from "../../Components/Form/AddTeste";
import AlertErro from "../Error/AlertError";

export default function ListaDeTestes() {
  const { user } = useContext(UserContext);
  const HEAD_TABLE = [
    "Grupo", "Casos de Uso", "Resultado", "Observações", "", "Ações"
  ];
  const {
    grupos, grupoSelecionado, subGrupoSelecionado, resultadoSelecionado, setResultadoSelecionado, sessionAtiva, loading, finalizarTestes, functionDeleteTest, functionSaveTest,
    handleChange, handleChangeObs, handleGrupoSelecionado, iniciarTestes, resetarTestes, handleSubGrupoSelecionado, subGruposFiltrados, testesFiltrados
  } = useListTest();
  const messageError = (!user ? "Você precisar está logado para acessar essa funcionalidade" : "Você não tem permissão para acessar essa funcionalidade , entre em contato com o administrador do sistema.");

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
              {user && user.admin ?
                <AddTeste
                  grupo={grupoSelecionado}
                  subgrupo={subGrupoSelecionado}
                /> :
                <AlertErro message={messageError} />
              }
            </ModalCadastro>
          }
        </div>
        <span className="w-full content-center text-xl font-Oswald dark:text-blue-50">Total de Testes: {testesFiltrados.length}</span>
      </div>
    </TableListTests>
  );
};
