import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Deterministic seeded categories so sample products can reference them
export const CATEGORY_IDS = {
  Electronics: "cat-electronics",
  Clothing: "cat-clothing",
  Kitchen: "cat-kitchen",
} as const;

const initialState = {
  categories: [
    { id: CATEGORY_IDS.Electronics, name: "Electronics" },
    { id: CATEGORY_IDS.Clothing, name: "Clothing" },
    { id: CATEGORY_IDS.Kitchen, name: "Kitchen" },
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
