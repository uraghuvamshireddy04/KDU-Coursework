import * as T from "../../config/Config"
import type{ Product } from "../types"

export const addToCart = (product: Product)=>({
    type: T.ADD_TO_CART, payload: product
});

export const updateQuantity = (id: number, quantity: number) => ({
    type: T.UPDATE_QUANTITY, payload: {id, quantity}
});

export const removeFromCart = (id: number) => ({
    type: T.REMOVE_FROM_CART, payload: id
});

