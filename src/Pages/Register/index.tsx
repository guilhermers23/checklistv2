import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootReducer } from "../../store";
import { useRegisterUserMutation } from "../../services/userService";
import { MessagemToastify } from "../../Components/Toastify";
import Input from "../../Components/Input";
import FormUser from "../../Components/Form/FormUser";
import foto from "./assets/telaLogin.png";

export default function RegisterForm() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handeSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (password !== confirmaSenha) {
      setError("As senhas não coincidem");
      return;
    };

    const res = await registerUser({ name, email, password, admin: false });
    if ("error" in res && res.error && "data" in res.error) {
      setError(res.error.data as string);
      console.error(res.error);
      return;
    };

    MessagemToastify("Usuário cadastrado com sucesso", "success");
    setEmail("");
    setName("");
    setPassword("");
    setConfirmaSenha("");
  };

  if (!user || !user.admin) return <Navigate to='/' />;

  return (
    <FormUser
      title="CADASTRAR USUÁRIO"
      onsubmit={handeSubmit}
      foto={foto}
      error={error}
      buttonTitle="Cadastrar"
      loading={!isLoading}
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
