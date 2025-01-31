import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";

interface DataTestes {
  grupoID: string;
  subGrupoID: string;
  description: string;
  resultado: string;
  observacao: string;
};

export const getAllListaTestes = () => {
  const response = axios.get(`${baseURL}/test`);
  return response;
};

export const postTeste = (data: DataTestes) => {
  const response = axios.post(`${baseURL}/test/created`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};
