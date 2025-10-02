import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoginMutation } from "../../services/userService";
import FormUser from "../../components/Form/FormUser";
import Input from "../../components/Input";
import { MessagemToastify } from "../../components/Toastify";
import foto from "./assets/telaLogin.png";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const res = await login({ email, password });

    if ("error" in res && res.error && "data" in res.error) {
      MessagemToastify(res.error.data as string, "error");
      console.error(res.error);
      setErro(res.error.data as string);
      return;
    };

    if ('data' in res && res.data) {
      Cookies.set("token", res.data.token, { expires: 1 }); // Access res.data safely
      MessagemToastify("Usuário logado com sucesso", "success");
      navigate("/");
    };
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
