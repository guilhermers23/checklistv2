import { FormEvent, useState } from "react";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import Button from "../../Components/Button";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handeSubmit = (event: FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    console.log({ email, senha, username, confirmaSenha });
  };

  return (
    <div className="m-auto mt-20 content-center flex bg-gray-100 w-10/12 p-2 rounded-lg lg:w-7/12 dark:bg-gray-800 justify-center">
      <img
        src={foto}
        alt="Imagem de uma tela de login"
        className="w-6/12  hidden md:block rounded-xl"
      />
      <form
        onSubmit={handeSubmit}
        className="12/12 md:w-6/12 flex flex-col items-center justify-center gap-6"
      >
        <h1 className="font-Oswald font-bold text-lg dark:text-gray-100">
          Cadastrar Usuário
        </h1>
        <Input
          label="Nome"
          type="text"
          placeholder="Insira seu nome..."
          setValor={setUsername}
          value={username}
        />

        <Input
          label="E-Mail"
          type="email"
          placeholder="Insira seu email..."
          setValor={setEmail}
          value={email}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Insira sua senha..."
          setValor={setSenha}
          value={senha}
        />

        <Input
          key="confirmaSenha"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha..."
          setValor={setConfirmaSenha}
          value={confirmaSenha}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
