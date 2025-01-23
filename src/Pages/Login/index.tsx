import { FormEvent, useState } from "react";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handeSubmit = (event: FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    console.log({ email, senha });
  };

  return (
    <div className="m-auto mt-20 flex bg-gray-100 w-10/12 p-2 rounded-lg lg:w-7/12 dark:bg-gray-800 justify-center">
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
          LOGIN
        </h1>
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

        <button className="login_button" type="submit">
          Entrar
        </button>

      </form>
    </div>
  );
}
