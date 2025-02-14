import { useEffect, useState } from "react";
import { getAllUser } from "../../API/loogerUserService";
import TableUsers from "../../Components/Tables/TableUsers";
import { IUser } from "../../Interfaces/IUser";

export default function ListaDeUsuarios() {
    const [users, setUsers] = useState<IUser[]>([]);

    const findAllUsers = async () => {
        try {
            const AllUser = await getAllUser();
            setUsers(AllUser.data);
        } catch (error) {
            console.error(error);
            alert("Ocorreu erro ao buscar usuários!")
        }
    };

    useEffect(() => {
        findAllUsers()
    }, []);

    return (
        <TableUsers
            users={users}
        />
    )
};
