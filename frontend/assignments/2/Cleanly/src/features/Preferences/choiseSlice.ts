import { createSlice } from "@reduxjs/toolkit"
import type { ChoiceState } from "../../types/choiseState";

const initialState: ChoiceState = {
    serviceType: "",
    frequency: "",
    rooms: [],
    extras: [],
    requirements: "",
    hours: 1,
    date: "",
    startTime: ""
}

export const choiseSlice = createSlice({
    name: "choise",
    initialState,
    reducers:{
        setServiceType: (state,action) => {state.serviceType = action.payload},
        setFrequency: (state,action) => {state.frequency = action.payload},
        setRequirements: (state,action) => {state.requirements = action.payload},
        setHours: (state,action) => {state.hours = action.payload},
        setDate: (state,action) => {state.date = action.payload},
        setStartTime: (state,action) => {state.startTime = action.payload},
        setExtras: (state, action) => {
            const index = state.extras.indexOf(action.payload);
            if (index === -1) {
               state.extras.push(action.payload); 
            } else {
               state.extras.splice(index, 1);
            }
        },
        setRooms: (state,action) => {
            const {name, count } = action.payload;
            state.rooms = state.rooms.filter(r => r.name !== name);
            if (count > 0) {
               state.rooms.push({ name, count });
            }
        }

    }

});

export const { setServiceType, setFrequency, setRequirements, setRooms, setExtras, setHours, setDate, setStartTime} = choiseSlice.actions;

export default choiseSlice.reducer;