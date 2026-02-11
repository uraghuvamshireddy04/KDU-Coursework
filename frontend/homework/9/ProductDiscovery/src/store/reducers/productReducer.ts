import * as T from "../../config/Config"
import type { ProductState } from "../types";

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  searchQuery: '',
  loading: false,
  searchLoading: false,
  error: null,
};

export const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case T.FETCH_PRODUCTS_START:
      return { ...state, loading: true, error: null };
    case T.SEARCH_PRODUCTS_START:
      return { ...state, searchLoading: true, error: null };
    case T.FETCH_SINGLE_START:
      return { ...state, loading: true, selectedProduct: null, error: null };
    case T.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, searchLoading: false, items: action.payload };
    case T.FETCH_SINGLE_SUCCESS:
      return { ...state, loading: false, selectedProduct: action.payload };
    case T.API_ERROR:
      return { ...state, loading: false, searchLoading: false, error: action.payload };
    case T.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case T.CLEAR_SEARCH:
        return {...state, searchQuery: ''};
    default:
      return state;
  }
};