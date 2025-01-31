import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/loogerUserService";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import Cookies from "js-cookie";
import FormUser from "../../Components/Form/FormUser";

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
    <FormUser title="LOGIN"
      onsubmit={handeSubmit}
      foto={foto}
      error={error}
      buttonTitle="Entrar">

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

    </FormUser>
  );
};
