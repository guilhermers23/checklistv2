import axios from "axios";
import { baseURL } from "./baseURL";

interface Dados {
  name?: string;
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: Dados) => {
  const response = await axios.post(`${baseURL}/auth/login`, { email, password });
  return response;
};

export const registerUser = async ({name, email, password} : Dados) => {
  const response = await axios.post(`${baseURL}/user/created`, { name, email, password });
  return response;
};
