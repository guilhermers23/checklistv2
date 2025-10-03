
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../services/userService";
import { MessagemToastify } from "../../Components/Toastify";
import useFilterUser from "../../Hooks/useFilterUser";
import TableUsers from "../../Components/Tables/TableUsers";

export default function ListaDeUsuarios() {
  const { data: users } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { user } = useSelector((state: RootReducer) => state.user);
  const { changeSearch, filteredUsers } = useFilterUser(users || []);

  const deletarButton = async (id: string) => {
    const res = await deleteUser(id);
    if ("error" in res) {
      console.error(res.error);
      MessagemToastify("Erro ao excluir usuário!", "error");
    };

    MessagemToastify("Usuário excluido com sucesso!", "success");
  };

  if (!user || !user.admin) return <Navigate to='/' />;

  return (
    <TableUsers
      users={filteredUsers}
      chageTerm={changeSearch}
      buttonDelete={deletarButton}
    />
  )
};
