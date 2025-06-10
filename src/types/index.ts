export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

export interface Review {
    id: number;
    text: string;
    author: string;
}

export interface ProductsResponse {
    items: Product[];
    total: number;
}

export interface CartItem extends Product {
    count: number;
} 

export interface Order {
    phone: string;
    cart: {
      id: number;
      quantity: number;
    }[];
  }
  
  export interface AppState {
    products: {
      items: Product[];
      loading: boolean;
      error: string | null;
    };
    cart: {
      items: CartItem[];
      customerPhone: string;
    };
  } 