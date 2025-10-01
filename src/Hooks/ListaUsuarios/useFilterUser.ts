import { useState } from "react";
import { IUser } from "../../Interfaces/IUser";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

const useFilterUser = (users: IUser[]) => {
  const { term } = useSelector((state: RootReducer) => state.filter);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);

  const changeSearch = () => {
    const filter = users.filter(({ name }) => name?.toLowerCase().includes(term.toLowerCase()));
    setFilteredUsers(filter);
  };

  return { term, filteredUsers, changeSearch }
};

export default useFilterUser;
