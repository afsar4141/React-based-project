import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: true, // App fetches products on mount
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        loadproduct: (state, action) => {
            state.products = action.payload;
        },
        setproductsloading: (state, action) => {
            state.loading = action.payload;
        },
    },
});
export default productSlice.reducer;
export const { loadproduct, setproductsloading } = productSlice.actions;
