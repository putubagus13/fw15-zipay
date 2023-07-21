import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: ""
};

const transaction = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactionHistory: (state, action) =>{
            state.history = action.payload;
        }
    }
});

export const {setTransactionHistory} = transaction.actions;
export default transaction.reducer;