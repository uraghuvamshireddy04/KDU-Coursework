import { createSlice } from "@reduxjs/toolkit";
import type { RegisterType } from "../../types/RegisterType";
import { getId, getStatus } from "./RegisterThunk";

const initialState: RegisterType = {
    name: "",
    email: "",
    event: "New Year",
    message: "",
    id: "",
    status: "",
    loading: false,
    error: null
}

export const RegisterSplice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setName: (state, action) => {state.name = action.payload},
        setEmail: (state, action) => {state.email = action.payload},
        setEvent: (state, action) => {state.event = action.payload},
        setMessage: (state, action) => {state.message = action.payload},
    },

    extraReducers: (builder) => {
        builder
        .addCase(getId.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getId.fulfilled, (state, action)=>{
            state.loading = false;
            state.id = action.payload.id;
            state.status = action.payload.status;
            state.error = null;
        })
        .addCase(getId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getStatus.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getStatus.fulfilled, (state, action)=>{
            state.loading = false;
            state.id = action.payload.id;
            state.status = action.payload.status;
            state.error = null;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.event = action.payload.event;
            state.message = action.payload.message;
        })
        .addCase(getStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ;
      })
    }
})
export const {setName, setEmail, setEvent, setMessage} = RegisterSplice.actions;
export default RegisterSplice.reducer;

