import type { Dispatch } from "redux";
import * as T from "../../config/Config"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com/products';

export const fetchAllProducts = () => async (dispatch: Dispatch) => {
 dispatch({type: T.FETCH_PRODUCTS_START});
 try{
    const response = await axios.get(BASE_URL);
    dispatch({type: T.FETCH_PRODUCTS_SUCCESS, payload: response.data.products});
 }catch(e: unknown){
    const msg = e instanceof Error ? e.message : String(e);
    dispatch({type: T.API_ERROR, payload: msg ?? "Failed to load products"});
 }
};

export const searchProducts = (query: string, signal?: AbortSignal) => async(dispatch: Dispatch)=>{
    dispatch({type: T.SEARCH_PRODUCTS_START});
    try{
        const response = await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, { signal });
        dispatch({type: T.FETCH_PRODUCTS_SUCCESS, payload: response.data.products});
    }catch(e: unknown){
        if (axios.isCancel(e)) {
            console.log("Request canceled:", query);
            return; 
        }
        const msg = e instanceof Error ? e.message : String(e);
        dispatch({type: T.API_ERROR, payload: msg ?? "Failed to load products"});
 }
};

export const getProductById = (id: number) => async(dispatch: Dispatch) => {
    dispatch({type: T.FETCH_SINGLE_START});
    try{
        const response = await axios.get(`${BASE_URL}/${id}`);
        dispatch({type: T.FETCH_SINGLE_SUCCESS, payload: response.data});
    }catch(e: unknown){
        const msg = e instanceof Error ? e.message : String(e);
        dispatch({type: T.API_ERROR, payload: msg ?? "Failed to load product"});
 }
};

export const clearSearch = () => ({
    type: T.CLEAR_SEARCH
});

export const setSearchQuery = (query: string) => ({
    type: T.SET_SEARCH_QUERY, payload: query
});
