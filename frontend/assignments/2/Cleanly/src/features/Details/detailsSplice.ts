import { createSlice } from "@reduxjs/toolkit";
import type { Deatils } from "../../types/details";

const initialState: Deatils ={
    cardNumber: "",
    month: 1,
    year: 2000,
    cvv: "",
    cardName: "",
    email: "",
    phone: "",
    address: ""

}

export const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
        setCardNumber: (state,action) => {state.cardNumber = action.payload},
        setMonth: (state,action) => {state.month = action.payload},
        setYear: (state,action) => {state.year = action.payload},
        setCvv: (state,action) => {state.cvv = action.payload},
        setCardName: (state,action) => {state.cardName = action.payload},
        setEmail: (state,action) => {state.email = action.payload},
        setPhone: (state,action) => {state.phone = action.payload},
        setAddress: (state,action) => {state.address = action.payload},
    }
})

export const {setCardNumber, setMonth, setYear, setCardName, setCvv, setEmail, setPhone, setAddress} = detailsSlice.actions;
export default detailsSlice.reducer;