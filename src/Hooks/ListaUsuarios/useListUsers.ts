import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContex";
import { deleteUser, getAllUser } from "../../API/loogerUserService";
import { IUser } from "../../Interfaces/IUser";
import { MessagemToastify } from "../../Components/Toastify";

const useListUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const { user } = useContext(UserContext);
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
            MessagemToastify("Ocorreu erro ao buscar usuários!", "error")
        }
    };

    const deletarButton = async (id: string) => {
        try {
            await deleteUser(id);
            MessagemToastify("Usuário excluido com sucesso!", "success")
        } catch (error) {
            console.error(error);
            MessagemToastify("Ocorreu erro ao excluir usuário!", "error")
        }
    };

    useEffect(() => { findAllUsers() }, []);

    return { deletarButton, users }
};

export default useListUsers;
