import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import Button from "../../Components/Button";
import { registerUser } from "../../Services/loogerUserService";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    console.log({ email, password, name, confirmaSenha });

    if (password !== confirmaSenha) {
      setError("As senhas não coincidem");
      return;
    };

    try {
      const response = await registerUser({ name, email, password });
      console.log(response);
      alert("Usuário cadastrado com sucesso");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Erro ao cadastrar usuário");
    };
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
          id="name"
          label="Nome"
          type="text"
          placeholder="Insira seu nome..."
          setValor={setName}
          value={name}
        />

        <Input
          id="email"
          label="E-Mail"
          type="email"
          placeholder="Insira seu email..."
          setValor={setEmail}
          value={email}
        />

        <Input
          id="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha..."
          setValor={setPassword}
          value={password}
        />

        <Input
          id="confirmaSenha"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha..."
          setValor={setConfirmaSenha}
          value={confirmaSenha}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};
