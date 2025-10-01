import { api } from "./api";
interface DadosSessao {
  grupo: string;
  subGrupo: string;
  tecnico: string | undefined;
  testes: ITeste[];
};

const sessionService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query<IDadosSessao[], void>({
      query: () => "/session",
      providesTags: ["Sessions"]
    }),

    postSession: builder.mutation<IDadosSessao, DadosSessao>({
      query: (body) => ({
        url: "/session/start",
        method: "POST",
        body
      }),
      invalidatesTags: ["Sessions"]
    }),

    finishSession: builder.mutation<IDadosSessao, { sessionId: string | undefined; testesAtualizados: ITeste[] }>({
      query: (body) => ({
        url: `/session/${body.sessionId}/finalize`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Sessions"]
    }),
  })
});

export const { useGetAllSessionsQuery, usePostSessionMutation, useFinishSessionMutation } = sessionService;
export default sessionService;
