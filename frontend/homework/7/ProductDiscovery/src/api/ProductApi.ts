import axios from "axios";
import type { Product } from "../models/Product";
import type { ProductResponse } from "../models/ProductResponse";
import { API_BASE_URL } from "../config/Config";

const BASE_URL = API_BASE_URL;
export const getProducts = async (): Promise<Product[]> => {
    const response = await axios<ProductResponse>(`${BASE_URL}`);
    return response.data.products;
}

export const getProductById = async(id: number): Promise<Product> => {
    const response  = await axios<Product> (`${BASE_URL}/${id}`);
    return response.data;
}