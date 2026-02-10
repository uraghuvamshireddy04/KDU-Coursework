import axios from "axios";
import type { Product } from "../models/Product";
import type { ProductResponse } from "../models/ProductResponse";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<ProductResponse>(`${BASE_URL}`);
    return response.data.products;
}

export const getProductById = async(id: number): Promise<Product> => {
    const response  = await axios.get<Product> (`${BASE_URL}/${id}`);
    return response.data;
}

export const searchProducts = async(search: string): Promise<Product[]> =>{
    const response = await axios.get<ProductResponse>(`${BASE_URL}/search?q=${search}`);
    return response.data.products;
}