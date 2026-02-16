import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
export const getId = createAsyncThunk(
    "register/getId",
    async (userData: any) =>{
        try{
            const response = await axios.post(`${BASE_URL}/register`, userData);
        return response.data;
        }catch(error){
            return error;
        }
        
    }
)

export const getStatus = createAsyncThunk(
    "getStatus",
    async (id: string) => {
        try{
            const response = await axios.get(`${BASE_URL}/status/${id}`);
            return response.data;
        }catch(error){
            return error;
        }
    }
)