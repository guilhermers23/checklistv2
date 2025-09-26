import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";
import { IGrupo, ISubGrupo } from "../Interfaces/ITestes";

export const getAllGrupos = () => {
  const response = axios.get(`${baseURL}/grupos`);
  return response;
};

export const getAllSubGrupos = () => {
  const response = axios.get(`${baseURL}/grupos/subGrupo`);
  return response;
};

export function getSubGrupoPorGrupo(grupoId: ISubGrupo) {
  const response = axios.get(
    `${baseURL}/grupos/subgrupos/por-grupo/${grupoId}`
  );
  return response;
};

export function postGrupo(body: IGrupo) {
  const response = axios.post(`${baseURL}/grupos/created`, body, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};

export function postSubGrupo(body: ISubGrupo) {
  const response = axios.post(`${baseURL}/grupos/subGrupo/created`, body, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};
