import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser } from "../../services/loogerUserService";
import { MessagemToastify } from "../../Components/Toastify";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import FormUser from "../../components/Form/FormUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const data = { email, password };
    setLoading(true);

    try {
      const response = await loginUser(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      MessagemToastify("Usuário logado com sucesso", "success");
      navigate("/");

    } catch (e) {
      console.error(e);
      setError("Erro ao logar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormUser title="LOGIN"
      onsubmit={handeSubmit}
      foto={foto}
      error={error}
      buttonTitle="Entrar"
      loading={!loading}>

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
