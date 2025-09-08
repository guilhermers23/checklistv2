import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "./baseURL";
import { IUser } from "../Interfaces/IUser";

export const loginUser = async ({ email, password }: Omit<IUser, "admin">) => {
  const response = await axios.post(`${baseURL}/auth/login`, {
    email,
    password,
  });
  return response;
};

export const registerUser = async ({ name, email, password, admin }: IUser) => {
  const response = await axios.post(`${baseURL}/user/created`, {
    name,
    email,
    password,
    admin
  });
  return response;
};

export const loggedUser = async () => {
  const response = axios.get(`${baseURL}/user/findById`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });

  return response;
};

export const getAllUser = async () => {
  const response = axios.get(`${baseURL}/user/`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};

export const deleteUser = async (id: string) => {
  const response = axios.delete(`${baseURL}/user/${id}/delete`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
};
