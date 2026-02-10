import type { Product } from "./Product";

export interface ProductContextType {
    products: Product[];
    selectedProduct: Product | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
    searchLoading: boolean;
    error: string | null;
    clearSearch: () => void;
    getProducts: () => void;
    getProductById: (id: number) => void;
    searchProducts: (search: string) => void;

}