import { useEffect, useState } from "react";
import { IUser } from "../../Interfaces/IUser";

const useFilterUser = (users: IUser[]) => {
    const [term, setTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    useEffect(() => { setFilteredUsers(users) }, [users]);

    const changeSearch = () => {
        const filter = users.filter(({ name }) => name?.toLowerCase().includes(term.toLowerCase()));
        setFilteredUsers(filter);
    };

    return { term, setTerm, filteredUsers, changeSearch }
};

export default useFilterUser;
