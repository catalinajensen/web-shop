export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}

export interface Rating {
  count: number;
  rate: number;
}

export interface State {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  shoppingCart: ShoppingCartItem[];
  isShoppingCartOpen: boolean;
}

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface Action {
  type: string;
  payload: Product[] | Product | boolean | number | string;
}

// export interface Reducer {
//   state: State;
//   action: Action;
// }
