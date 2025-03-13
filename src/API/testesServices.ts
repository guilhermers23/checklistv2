import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";

interface DataTestes {
  grupoID: string;
  subGrupoID: string;
  description: string;
  resultado: string;
  observacao: string;
  files: string;
}

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

export const deleteTeste = (id: string) => {
  const response = axios.delete(`${baseURL}/test/deleted/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};

export const updateTeste = (
  id: string,
  body: { resultado: string; observacao: string | undefined }
) => {
  const response = axios.patch(`${baseURL}/test/update/${id}`, body);
  return response;
};
