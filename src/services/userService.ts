import { api } from "./api";

type AuthUser = { token: string; user: IUser; };

export const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, { email: string, password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),

    registerUser: builder.mutation<AuthUser, IUser>({
      query: (body) => ({
        url: "/user/created",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),

    loggedUser: builder.query<IUser, void>({
      query: () => "/user/findById",
      providesTags: ["User"]
    }),

    getAllUser: builder.query<IUser[], void>({
      query: () => "/user",
      providesTags: ["User"]
    }),

    deleteUser: builder.mutation<{ sucess: boolean }, string>({
      query: (id) => ({
        url: `/user/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"]
    }),
  })
});

export const { useLoginMutation, useLoggedUserQuery,
  useGetAllUserQuery, useDeleteUserMutation, useRegisterUserMutation } = userService;
export default userService;
