import { Guid } from "guid-typescript";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

const initialState = {
  categories: [
    { id: Guid.create().toString(), name: "Electronics" },
    { id: Guid.create().toString(), name: "Clothing" },
    { id: Guid.create().toString(), name: "Kitchen" },
  ] as Category[],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    addCategories(state, action: PayloadAction<Category[]>) {
      state.categories = [...state.categories, ...action.payload];
    },
    removeCategories(state, action: PayloadAction<string[]>) {
      state.categories = state.categories.filter(
        (c) => !action.payload.includes(c.id)
      );
    },
    updateCategories(state, action: PayloadAction<Category[]>) {
      action.payload.forEach((updated) => {
        const idx = state.categories.findIndex((c) => c.id === updated.id);
        if (idx !== -1) state.categories[idx] = updated;
      });
    },
  },
});

export const {
  setCategories,
  addCategories,
  removeCategories,
  updateCategories,
} = categorySlice.actions;
