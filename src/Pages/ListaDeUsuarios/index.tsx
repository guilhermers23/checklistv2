
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../services/userService";
import { MessagemToastify } from "../../components/Toastify";
import useFilterUser from "../../hooks/ListaUsuarios/useFilterUser";
import TableUsers from "../../components/Tables/TableUsers";

const ListaDeUsuarios = () => {
  const { data: users } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { user } = useSelector((state: RootReducer) => state.user);
  const { term, changeSearch, filteredUsers } = useFilterUser(users || []);

  const deletarButton = async (id: string) => {
    try {
      await deleteUser(id);
      MessagemToastify("Usuário excluido com sucesso!", "success");
    } catch (error) {
      console.error(error);
      MessagemToastify("Erro ao excluir usuário!", "error");
    }
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

export default ListaDeUsuarios;
