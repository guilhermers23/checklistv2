import { IUser } from './../Interfaces/IUser';
import { api } from "./api";

type AuthUser = { token: string; user: IUser; };

export const userService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthUser, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            })
        }),

        registerUser: builder.mutation<AuthUser, IUser>({
            query: (body) => ({
                url: "/user/created",
                method: "POST",
                body
            })
        }),

        loggedUser: builder.query<IUser, void>({
            query: () => "/user/findById",
            providesTags: ["User"]
        }),

        getAllUser: builder.query<IUser, void>({
            query: () => "/user",
            providesTags: ["User"]
        }),

        deleteUser: builder.mutation<{ sucess: boolean }, string>({
            query: (id) => ({
                url: `/user/${id}/delete`,
                method: "DELETE",
            })
        }),
    })
});

export const { useLoginMutation, useLoggedUserQuery, useGetAllUserQuery, useDeleteUserMutation, useRegisterUserMutation } = userService;
export default userService;
