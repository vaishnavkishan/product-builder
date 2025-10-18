import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../Types/types";

export interface GlobalState {
  orders: Order[];
}

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    orders: [] as Order[],
  },
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },

    addOrders(state, action: PayloadAction<Order[]>) {
      state.orders = [...state.orders, ...action.payload];
    },

    removeOrders(state, action: PayloadAction<string[]>) {
      state.orders = state.orders.filter((o) => !action.payload.includes(o.id));
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

export const { setOrders, addOrders, removeOrders, updateOrders } =
  globalSlice.actions;
