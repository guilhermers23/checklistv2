import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContex";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API/loogerUserService";
import { MessagemToastify } from "../../Components/Toastify";

const useRegister = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmaSenha, setConfirmaSenha] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handeSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        if (password !== confirmaSenha) {
            setError("As senhas não coincidem");
            return;
        };

        setLoading(true);

        try {
            const response = { name, email, password };
            await registerUser(response);
            MessagemToastify("Usuário cadastrado com sucesso", "success");
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

    return { name, setName, email, setEmail, password, setPassword, confirmaSenha, setConfirmaSenha, error, loading, handeSubmit }
};

export default useRegister;
