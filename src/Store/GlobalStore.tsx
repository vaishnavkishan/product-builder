import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, Product } from "../Types/types";
import { Guid } from "guid-typescript";

export interface GlobalState {
  products: Product[];
  orders: Order[];
}

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    products: [
      {
        id: Guid.create().toString(),
        name: "Laptop",
        category: "Electronics",
        price: 70000,
      },
      {
        id: Guid.create().toString(),
        name: "T-Shirt",
        category: "Clothing",
        price: 999,
      },
      {
        id: Guid.create().toString(),
        name: "Coffee Mug",
        category: "Kitchen",
        price: 299,
      },
    ] as Product[],
    orders: [] as Order[],
  },
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    addProducts(state, action: PayloadAction<Product[]>) {
      state.products = [...state.products, ...action.payload];
    },
    addOrders(state, action: PayloadAction<Order[]>) {
      state.orders = [...state.orders, ...action.payload];
    },
    removeProducts(state, action: PayloadAction<string[]>) {
      state.products = state.products.filter(
        (p) => !action.payload.includes(p.id)
      );
    },
    removeOrders(state, action: PayloadAction<string[]>) {
      state.orders = state.orders.filter((o) => !action.payload.includes(o.id));
    },
    updateProducts(state, action: PayloadAction<Product[]>) {
      action.payload.forEach((updatedProduct) => {
        const index = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
    },
    updateOrders(state, action: PayloadAction<Order[]>) {
      action.payload.forEach((updatedOrder) => {
        const index = state.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
    },
  },
});

export const {
  setProducts,
  addProducts,
  removeProducts,
  updateProducts,
  setOrders,
  addOrders,
  removeOrders,
  updateOrders,
} = globalSlice.actions;
