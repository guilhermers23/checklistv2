import { configureStore } from '@reduxjs/toolkit';
import serviceTeste from "../services/serviceTeste";

export const store = configureStore({
    reducer: {
        [serviceTeste.reducerPath]: serviceTeste.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(serviceTeste.middleware)
});

export type RootReducer = ReturnType<typeof store.getState>;