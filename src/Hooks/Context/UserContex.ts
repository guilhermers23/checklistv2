import { createContext } from "react";
import { IUser } from "../../Interfaces/IUser";

interface UserContextValue {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
};

export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: () => { }
});
