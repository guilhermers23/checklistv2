import axios from "axios";
import { baseURL } from "./baseURL";

export const getAllGrupos = () => {
  const response = axios.get(`${baseURL}/grupos`);
  return response;
};

export const getAllSubGrupos = () => {
  const response = axios.get(`${baseURL}/grupos/subGrupo`);
  return response;
};
