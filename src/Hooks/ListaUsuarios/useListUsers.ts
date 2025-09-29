import { useNavigate } from "react-router-dom";
import { IUser } from "../../Interfaces/IUser";
import { useEffect, useState } from "react";

const useListUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    const findAllUsers = async () => {
        if (!user?.admin) {
            navigate("/");
            return
        }
        try {
            const AllUser = await getAllUser();
            setUsers(AllUser.data);
        } catch (error) {
            console.error(error);
            alert("Ocorreu erro ao buscar usuários!")
        }
    };

    const deletarButton = async (id: string) => {
        try {
            await deleteUser(id);
            alert("Usuário excluido com sucesso!")
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { findAllUsers() }, []);

    return { deletarButton, users }
};

export default useListUsers;
