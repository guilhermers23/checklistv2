import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API/loogerUserService";
import Input from "../../Components/Input";
import foto from "./assets/telaLogin.png";
import FormUser from "../../Components/Form/FormUser";
import { UserContext } from "../../Hooks/Context/UserContex";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    if (password !== confirmaSenha) {
      setError("As senhas não coincidem");
      return;
    };

    try {
      const response = { name, email, password };
      await registerUser(response);
      console.log(response);
      alert("Usuário cadastrado com sucesso");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (!user?.admin) {
      navigate("/")
      return
    };
  });

  return (
    <FormUser
      title="CADASTRAR USUÁRIO"
      onsubmit={handeSubmit}
      foto={foto}
      error={error}
      buttonTitle="Cadastrar"
      loading={!loading}
    >

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
    </FormUser>
  );
};
