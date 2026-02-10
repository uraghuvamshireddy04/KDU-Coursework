import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ProductContextType } from "../models/ProductContextType";
import type { Product } from "../models/Product";
import * as api from "../api/ProductApi"

const ProductContext = createContext<ProductContextType>({} as ProductContextType);
export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getProducts = useCallback(async() => {
        try{
            setLoading(true);
            const response = await api.getProducts();
            setProducts(response);
            setError(null);
        }catch(error: any){
            setError(error.message);
        }finally {
            setLoading(false);
        }
    },[]);

    const getProductById = useCallback(async (id: number) => {
        try {
            setLoading(true);
            const product = await api.getProductById(id);
            setSelectedProduct(product);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    },[]);

    const searchProducts = useCallback(async(search: string) => {
        try{
            setSearchLoading(true);
            const response = await api.searchProducts(search);
            setProducts(response);
            setError(null);
        }catch(error: any){
            setError(error.message);
        }finally {
            setSearchLoading(false);
        }
    },[]);

    const clearSearch = () =>{
        setSearchQuery("");
        getProducts();
    };
    return (<ProductContext.Provider 
    value={{products, selectedProduct, searchQuery, setSearchQuery, loading, searchLoading, error, clearSearch, getProductById, getProducts, searchProducts}}>
        {children}
    </ProductContext.Provider>)
};

export const useProductContext = () => useContext(ProductContext);
