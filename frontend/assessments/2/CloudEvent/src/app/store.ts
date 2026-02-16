import { configureStore } from "@reduxjs/toolkit";
import  RegisterSplice  from "../features/Register/RegisterSplice";

export const store= configureStore({
    reducer: {
        register: RegisterSplice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
