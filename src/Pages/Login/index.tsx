import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/loogerUserService";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import Button from "../../Components/Button";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const data = { email, password };

    try {
      const response = await loginUser(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      alert("Usuário logado com sucesso");
      navigate("/");

    } catch (e) {
      console.error(e);
      setError("Erro ao logar usuário");
    };
  };

  return (
    <div className="m-auto mt-20 flex bg-gray-100 w-10/12 p-2 rounded-lg lg:w-7/12 dark:bg-gray-800 justify-center">
      <form
        onSubmit={handeSubmit}
        className="12/12 md:w-6/12 flex flex-col items-center justify-center gap-6"
      >
        <h1 className="font-Oswald font-bold text-lg dark:text-gray-100">
          LOGIN
        </h1>
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

        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Entrar</Button>
      </form>

      <img
        src={foto}
        alt="Imagem de uma tela de login"
        className="w-6/12  hidden md:block rounded-xl"
      />
    </div>
  );
};
