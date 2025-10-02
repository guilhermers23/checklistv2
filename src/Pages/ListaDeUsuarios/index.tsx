
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../services/userService";
import { MessagemToastify } from "../../components/Toastify";
import useFilterUser from "../../hooks/ListaUsuarios/useFilterUser";
import TableUsers from "../../components/Tables/TableUsers";

export default function ListaDeUsuarios() {
  const { data: users } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { user } = useSelector((state: RootReducer) => state.user);
  const { term, changeSearch, filteredUsers } = useFilterUser(users || []);

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
      term={term}
      users={filteredUsers}
      chageTerm={changeSearch}
      buttonDelete={deletarButton}
    />
  )
};
