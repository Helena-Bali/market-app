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