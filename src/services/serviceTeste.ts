import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IGrupo, ISubGrupo, ITeste } from "../Interfaces/ITestes";
import { baseURL } from "./baseURL";

const ServiceTeste = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL
    }),
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
    })
});

export const { useGetAllTesteQuery, useGetAllSubGruposQuery, useGetSubGrupoByGrupoQuery, useGetAllGruposQuery } = ServiceTeste;
export default ServiceTeste;
