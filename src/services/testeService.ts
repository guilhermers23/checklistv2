import { api } from "./api";

type DataTestes = {
  grupoID: string;
  subGrupoID: string;
  description: string;
  resultado: string;
  observacao: string;
  files: string;
};

const testeService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeste: builder.query<ITeste[], void>({
      query: () => "/test",
      providesTags: ["Tests"]
    }),

    getAllGrupos: builder.query<IGrupo[], void>({
      query: () => "/grupos",
      providesTags: ["Grupos"]
    }),

    getAllSubGrupos: builder.query<ISubGrupo[], void>({
      query: () => "/grupos/subGrupo",
      providesTags: ["SubGrupo"]
    }),

    getSubGrupoByGrupo: builder.query<ISubGrupo, string>({
      query: (grupoId) => `/grupos/subGrupo/${grupoId}`
    }),

    postTeste: builder.mutation<ITeste, DataTestes>({
      query: (data) => ({
        url: "/test/created",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Tests"]
    }),

    deleteTeste: builder.mutation<{ sucess: boolean }, string>({
      query: (id) => ({
        url: `/test/deleted/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"]
    }),

    updateTeste: builder.mutation<ITeste, { id: string; resultado: string; observacao: string | undefined; }>({
      query: (body) => ({
        url: `/test/update/${body.id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Tests"]
    }),

    postGrupo: builder.mutation<IGrupo, IGrupo>({
      query: (body) => ({
        url: "/grupos/created",
        method: "POST",
        body
      }),
      invalidatesTags: ["Grupos"]
    }),

    postSubGrupo: builder.mutation<ISubGrupo, ISubGrupo>({
      query: (body) => ({
        url: "/grupos/subGrupo/created",
        method: "POST",
        body
      }),
      invalidatesTags: ["SubGrupo"]
    }),
  })
});


export const { useGetAllTesteQuery, useGetAllSubGruposQuery,
  useGetSubGrupoByGrupoQuery, useGetAllGruposQuery,
  useDeleteTesteMutation, usePostTesteMutation, useUpdateTesteMutation,
  useLazyGetAllSubGruposQuery, usePostGrupoMutation, usePostSubGrupoMutation } = testeService;
export default testeService;
