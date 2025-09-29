import { IGrupo, ISubGrupo, ITeste } from "../Interfaces/ITestes";
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
        getAllTeste: builder.query<ITeste, void>({
            query: () => "/test"
        }),

        getAllGrupos: builder.query<IGrupo, void>({
            query: () => "/grupos"
        }),

        getAllSubGrupos: builder.query<ISubGrupo, void>({
            query: () => "/grupos/subGrupo"
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
            invalidatesTags: ["Testes"]
        }),

        deleteTeste: builder.mutation<{ sucess: boolean }, string>({
            query: (id) => ({
                url: `/test/deleted/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Testes"]
        }),

        updateTeste: builder.mutation<ITeste, { id: string; body: DataTestes }>({
            query: ({ id, body }) => ({
                url: `/test/update/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Testes"]
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
