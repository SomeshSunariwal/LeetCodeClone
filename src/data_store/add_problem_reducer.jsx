import { createSlice } from "@reduxjs/toolkit";

const addProblemSlice = createSlice({
    name: "AddProblem",

    initialState: {
        loading: false,
        error: null,
        data: [],   // full metadata (Easy → categories → problems)
    },

    reducers: {

        // Start fetching
        fetchAddProblemStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Success
        fetchAddProblemSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },

        // Failure
        fetchAddProblemFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchAddProblemStart,
    fetchAddProblemSuccess,
    fetchAddProblemFailure
} = addProblemSlice.actions;

export default addProblemSlice.reducer;
