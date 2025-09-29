// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";

const baseUrl = baseURL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: () => ({}),
});
