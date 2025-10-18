import { Guid } from "guid-typescript";
import type { Product } from "../Types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
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
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProducts(state, action: PayloadAction<Product[]>) {
      state.products = [...state.products, ...action.payload];
    },
    removeProducts(state, action: PayloadAction<string[]>) {
      state.products = state.products.filter(
        (p) => !action.payload.includes(p.id)
      );
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
  },
});

export const { setProducts, addProducts, removeProducts, updateProducts } =
  productSlice.actions;
