import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link to="/addGrupo">
        <h1>Cadastrar Grupo</h1>
      </Link>
      <Link to="/addSubGrupo">
        <h1>Cadastrar SubGrupo</h1>
      </Link>
      <Link to="/login">
        <h1>Tela de Login</h1>
      </Link>
      <Link to="/register">
        <h1>Tela de Cadastro</h1>
      </Link>
      <Link to="/listaTestes">
        <h1>Lista de Testes</h1>
      </Link>
    </div>
  );
}
