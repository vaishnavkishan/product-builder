export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  client: string;
  country: string;
}
