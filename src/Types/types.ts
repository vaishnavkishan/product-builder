export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  client: string;
  country: string;
}
