import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

const useFilterUser = (users: IUser[]) => {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
  const { term } = useSelector((state: RootReducer) => state.filter);

  const changeSearch = () => {
    const filter = users.filter(({ name }) => name?.toLowerCase().includes(term.toLowerCase()));
    setFilteredUsers(filter);
  };

  return { term, filteredUsers, changeSearch }
};

export default useFilterUser;
