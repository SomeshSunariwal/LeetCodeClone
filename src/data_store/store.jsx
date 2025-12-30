import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem_store";
import problemListReducer from "./problemList_store";
import runCodeStore from "./run_code_store";
import codePrettierStore from "./code_prettier";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        problemList: problemListReducer,
        runCode: runCodeStore,
        codePrettier: codePrettierStore
    },
    middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);