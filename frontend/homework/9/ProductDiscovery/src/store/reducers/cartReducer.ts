import type {CartItem}  from '../types';
import * as T from "../../config/Config"

const initialState = {
  items: [] as CartItem[],
  totalPrice: 0
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case T.ADD_TO_CART: {
      const existing = state.items.find(item => item.id === action.payload.id);
      let newItems;
      if (existing) {
        newItems = state.items.map(item =>  item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return {...state,items: newItems, totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
      };
    }

    case T.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const newItems = state.items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item);
      return { ...state, items: newItems, totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0) };
    }
    case T.REMOVE_FROM_CART: {
      const filtered = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: filtered, totalPrice: filtered.reduce((acc, i) => acc + i.price * i.quantity, 0) };
    }

    default: return state;
  }
};