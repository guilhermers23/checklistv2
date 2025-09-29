import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoginMutation } from "../../services/userService";
import FormUser from "../../Components/Form/FormUser";
import Input from "../../Components/Input";
import { MessagemToastify } from "../../Components/Toastify";
import foto from "./assets/telaLogin.png";

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const data = { email, password };

    const res = await login({ email: data.email, password: data.password });
    if ('data' in res && res.data) {
      Cookies.set("token", res.data.token, { expires: 1 }); // Access res.data safely
    }
    MessagemToastify("Usuário logado com sucesso", "success");
    navigate("/");

    if (error) {
      setErro("Ocorre erro ao logar");
    }
  };

  return (
    <FormUser title="LOGIN"
      onsubmit={handeSubmit}
      foto={foto}
      error={erro}
      buttonTitle="Entrar"
      loading={!isLoading}>

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
