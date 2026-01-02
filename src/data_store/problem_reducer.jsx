import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",

    initialState: {
        data: {
            Serial: "",
            Level: "",
            Category: "",
            ProblemName: "",
            ProblemDescription: "",
            SampleCode: {
                cpp: "",
                c: "",
                python: "",
                java: ""
            },
            SampleInputs: [],
            SampleOutputs: [],
            TestCaseInputs: [],
            TestCaseOutputs: []
        },
        loading: false,
        error: null
    },

    reducers: {
        fetchProblemStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        fetchProblemSuccess: (state, action) => {
            state.data = action.payload
            state.loading = false;
            state.error = null;
        },

        fetchProblemFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchProblemStart,
    fetchProblemSuccess,
    fetchProblemFailure
} = problemSlice.actions;

export default problemSlice.reducer;
