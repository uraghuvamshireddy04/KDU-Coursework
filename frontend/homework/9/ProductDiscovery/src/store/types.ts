export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  searchQuery: string;
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
}