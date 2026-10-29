import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        items: []
    },
    reducers: {
        addItems: (state, action) => {
            const existingItem = state.items.find(
                (i) => i.id === action.payload.id
            );
            if (existingItem) {
                existingItem.qty = (existingItem.qty || 1) + 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
        },
        clearCart: (state, action) => {
            state.items.length = 0
        },
        removeItem: (state, action) => {
            state.items.pop()
        },
        incrementItem: (state, action) => {
            const item = state.items.find(
                (i) => i.id === action.payload
            );
            if (item) {
                item.qty = (item.qty || 1) + 1;
            }
        },
        decrementItem: (state, action) => {
            const idx = state.items.findIndex(
                (i) => i.id === action.payload
            );
            if (idx !== -1) {
                const item = state.items[idx];
                if ((item.qty || 1) <= 1) {
                    state.items.splice(idx, 1);
                } else {
                    item.qty -= 1;
                }
            }
        },
        removeItemById: (state, action) => {
            state.items = state.items.filter(
                (i) => i.id !== action.payload
            );
        },

    }

})

export const { addItems, clearCart, removeItem, incrementItem, decrementItem, removeItemById } = cartSlice.actions
export default cartSlice.reducer