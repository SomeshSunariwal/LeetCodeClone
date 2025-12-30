import { createSlice } from "@reduxjs/toolkit";

const codePrettierSlice = createSlice({
    name: "CodePrettier",

    initialState: {
        loading: false,
        error: null,
        data: [],   // full metadata (Easy → categories → problems)
    },

    reducers: {

        // Start fetching
        fetchCodePrettierStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Success
        fetchCodePrettierSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },

        // Failure
        fetchCodePrettierFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCodePrettierStart,
    fetchCodePrettierSuccess,
    fetchCodePrettierFailure
} = codePrettierSlice.actions;

export default codePrettierSlice.reducer;
