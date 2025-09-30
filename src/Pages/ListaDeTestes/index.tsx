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
  const {
    grupos, grupoSelecionado, subGrupoSelecionado, resultadoSelecionado, setResultadoSelecionado, sessionAtiva, loading, finalizarTestes, functionDeleteTest, functionSaveTest,
    handleChange, handleChangeObs, handleGrupoSelecionado, iniciarTestes, resetarTestes, handleSubGrupoSelecionado, subGruposFiltrados, testesFiltrados
  } = useListTest();
  const messageError = (!user ? "Você precisar está logado para acessar essa funcionalidade" : "Você não tem permissão para acessar essa funcionalidade , entre em contato com o administrador do sistema.");

  return (
    <TableListTests
      title="Lista de Testes"
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

      <div className="m-2 flex gap-5 justify-between print:hidden">
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
          <label htmlFor='resultado' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            Resultado
          </label>
          <select id='resutado' className="print:bg-transparent print:border-0 print:font-medium 
           block p-2 w-full mb-5 text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-0 focus:border-gray-200 peer
          "
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
        <span className="w-full content-around text-end text-md px-5 font-Oswald dark:text-blue-50">Total de Testes: {testesFiltrados.length}</span>
      </div>

      {/* Secção para impressão */}
      <div className="w-full justify-between hidden print:flex mb-5">
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

        <span className="w-full content-around text-end text-md px-5 font-Oswald dark:text-blue-50">Total de Testes: {testesFiltrados.length}</span>
      </div>
    </TableListTests>
  );
};
