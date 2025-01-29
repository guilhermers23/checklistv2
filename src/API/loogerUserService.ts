import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "./baseURL";
import { IUser } from "../Interfaces/IUser";

export const loginUser = async ({ email, password }: IUser) => {
  const response = await axios.post(`${baseURL}/auth/login`, {
    email,
    password,
  });
  return response;
};

export const registerUser = async ({ name, email, password }: IUser) => {
  const response = await axios.post(`${baseURL}/user/created`, {
    name,
    email,
    password,
  });
  return response;
};

export const loggedUser = async () => {
  const response = axios.get(`${baseURL}/user/findById`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });

  return response;
};
