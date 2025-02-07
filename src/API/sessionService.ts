import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";
import { ITeste } from "../Interfaces/ITestes";

export interface DadosSessao {
  _id?: string;
  grupoId: string;
  subGrupoId: string;
  tecnico: string | undefined;
  testes: ITeste[];
}

export const postSession = (dados: DadosSessao) => {
  const response = axios.post(`${baseURL}/session/start`, dados, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};

export const finishSession = (
  sessionId: string | undefined,
  testesAtualizados: {
    _id: string | undefined;
    resultado: string;
    observacao: string | undefined;
  }[]
) => {
  const body = { testesAtualizados };
  const response = axios.patch(
    `${baseURL}/session/${sessionId}/finalize`,
    body,
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  return response;
};

export const getAllSessions = () => {
  const response = axios.get(`${baseURL}/session`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};
