import axios from "axios";
import { baseURL } from "./baseURL";

export function getAllListaTestes() {
    const response = axios.get(`${baseURL}/test`);
    return response;
};