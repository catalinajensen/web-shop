import { Reducer } from 'react';
import { Action, Product, State } from '../types';

const getShoppingCartFromLocalStorage = () => {
  const localCart = localStorage.getItem('localCart');

  return localCart ? JSON.parse(localCart) : [];
};

export const initialState: State = {
  products: [],
  filteredProducts: [],
  categories: [],
  shoppingCart: getShoppingCartFromLocalStorage(),
  isShoppingCartOpen: false
};

export const reducerFn: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_PRODUCTS':
      return {
        ...state,
        products: payload as Product[],
        filteredProducts: payload as Product[],
        categories: (payload as Product[]).reduce(
          (result: string[], product) => {
            if (!result.includes(product.category)) {
              result.push(product.category);
            }
            return result;
          },
          []
        )
      };
    case 'ADD_TO_CART': {
      const { id } = payload as Product;
      const existingItem = state.shoppingCart.find(
        (item) => item.product.id === id
      );

      return {
        ...state,
        shoppingCart: existingItem
          ? [
              ...state.shoppingCart.map((item) => {
                return {
                  ...item,
                  quantity:
                    item.product.id === id ? item.quantity + 1 : item.quantity
                };
              })
            ]
          : [
              ...state.shoppingCart,
              {
                product: payload as Product,
                quantity: 1
              }
            ]
      };
    }
    case 'FILTER_BY_CATEGORY': {
      return {
        ...state,
        filteredProducts: payload
          ? state.products.filter((product) => product.category === payload)
          : [...state.products]
      };
    }
    case 'OPEN_CART': {
      return {
        ...state,
        isShoppingCartOpen: payload as boolean
      };
    }
    case 'REMOVE_ONE_FROM_CART': {
      const existingItem = state.shoppingCart.find(
        (item) => item.product.id === payload
      );

      return {
        ...state,
        shoppingCart:
          existingItem?.quantity === 1
            ? state.shoppingCart.filter((item) => item.product.id !== payload)
            : [
                ...state.shoppingCart.map((item) => {
                  return {
                    ...item,
                    quantity:
                      item.product.id === payload
                        ? item.quantity - 1
                        : item.quantity
                  };
                })
              ]
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (item) => item.product.id !== payload
        )
      };
    }
    case 'SEARCH': {
      return {
        ...state,
        filteredProducts: payload
          ? state.products.filter((product) =>
              product.title.toLowerCase().includes(payload as string)
            )
          : [...state.products]
      };
    }
    default:
      return state;
  }
};
