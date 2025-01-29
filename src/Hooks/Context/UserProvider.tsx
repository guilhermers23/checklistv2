import { useState } from "react";
import { IUser } from "../../Interfaces/IUser";
import { UserContext } from "./UserContex";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};
