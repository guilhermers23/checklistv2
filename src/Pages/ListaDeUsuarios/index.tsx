import { useContext, useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../API/loogerUserService";
import TableUsers from "../../Components/Tables/TableUsers";
import { IUser } from "../../Interfaces/IUser";
import { UserContext } from "../../Hooks/Context/UserContex";
import { useNavigate } from "react-router-dom";

export default function ListaDeUsuarios() {
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

    useEffect(() => {
        findAllUsers()
    }, []);

    return (
        <TableUsers
            users={users}
            buttonDelete={deletarButton}
        />
    )
};
