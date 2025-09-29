import { configureStore } from '@reduxjs/toolkit';
import { api } from "../services/api";
import userReducer from "./reducers/user";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userReducer
    },
    middleware: (gDM) => gDM().concat(api.middleware)
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
