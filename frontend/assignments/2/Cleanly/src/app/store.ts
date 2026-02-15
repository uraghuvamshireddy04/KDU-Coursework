import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "../features/Home/homeApi";
import  choiseSlice  from "../features/Preferences/choiseSlice";
import  detailsSlice  from "../features/Details/detailsSplice";

export const store = configureStore({
    reducer: {
        [homeApi.reducerPath]: homeApi.reducer,
        choise: choiseSlice,
        details: detailsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;