import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem_reducer";
import problemListReducer from "./problemList_reducer";
import runCodeReducer from "./run_code_reducer";
import codePrettierReducer from "./code_prettier_reducer";
import runAllTestCasesReducer from "./run_all_testcase_reducer";
import addProblemReducer from "./add_problem_reducer";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        problemList: problemListReducer,
        runCode: runCodeReducer,
        runAllTestCases: runAllTestCasesReducer,
        codePrettier: codePrettierReducer,
        addProblem: addProblemReducer
    },
    middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);