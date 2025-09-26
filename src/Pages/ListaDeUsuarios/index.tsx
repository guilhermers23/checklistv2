import useListUsers from "../../Hooks/ListaUsuarios/useListUsers";
import TableUsers from "../../components/Tables/TableUsers";
import useFilterUser from "../../Hooks/ListaUsuarios/useFilterUser";

export default function ListaDeUsuarios() {
    const { users, deletarButton } = useListUsers();
    const { term, setTerm, changeSearch, filteredUsers } = useFilterUser(users);

    return (
        <TableUsers
            term={term}
            setTerm={setTerm}
            users={filteredUsers}
            chageTerm={changeSearch}
            buttonDelete={deletarButton}
        />
    )
};
