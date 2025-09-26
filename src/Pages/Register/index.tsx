import foto from "./assets/telaLogin.png";
import Input from "../../Components/Input";
import FormUser from "../../components/Form/FormUser";
import useRegister from "../../Hooks/Register/useRegister";

export default function RegisterForm() {
  const { name, setName, email, setEmail, password, confirmaSenha, setPassword, setConfirmaSenha, error, loading, handeSubmit } = useRegister();

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
