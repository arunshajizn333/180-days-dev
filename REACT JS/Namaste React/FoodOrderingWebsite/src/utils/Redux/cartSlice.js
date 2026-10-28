import { createSlice } from "@reduxjs/toolkit";


const cartSlice= createSlice({
    name: "Cart",
    initialState:{
        items :[]
    },
    reducers: {
        addItems :(state,action)=>{
            state.items.push(action.payload)

        }
     }

})

export const{addItems}=cartSlice.actions
export default cartSlice.reducer