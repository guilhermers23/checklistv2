import foto from "./assets/telaLogin.png";
import Input from "../../Components/Input";
import FormUser from "../../Components/Form/FormUser";
import useRegister from "../../Hooks/Register/useRegister";

export default function RegisterForm() {
  const { name, setName, email, setEmail, password, confirmaSenha, setPassword, setConfirmaSenha, error, loading, handeSubmit, admin, setAdmin } = useRegister();

  return (
    <FormUser
      title="CADASTRAR USUÁRIO"
      onsubmit={handeSubmit}
      foto={foto}
      error={error}
      buttonTitle="Cadastrar"
      loading={!loading}>

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

      <div className="flex items-start mb-4">
        <input id="default-checkbox" type="checkbox" value="admin" checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Administrador</label>
      </div>

    </FormUser>
  );
};
