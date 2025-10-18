import type { Product } from "../Types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CATEGORY_IDS } from "./CategoryStore";

const initialState = {
  products: [
    {
      id: "prod-1",
      name: "Laptop",
      categoryId: CATEGORY_IDS.Electronics,
      price: 70000,
    },
    {
      id: "prod-2",
      name: "T-Shirt",
      categoryId: CATEGORY_IDS.Clothing,
      price: 999,
    },
    {
      id: "prod-3",
      name: "Coffee Mug",
      categoryId: CATEGORY_IDS.Kitchen,
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
