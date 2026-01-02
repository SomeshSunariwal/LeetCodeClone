import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchAddProblemStart,
    fetchAddProblemSuccess,
    fetchAddProblemFailure
} from "../data_store/add_problem_reducer";
import CONSTANTS from "../constants/constants";

function* fetchAddProblemSaga(action) {
    const data = action.payload;

    try {
        const endpoint = CONSTANTS.BASE_URLS + CONSTANTS.API + CONSTANTS.SLASH + CONSTANTS.ADD_PROBLEM;

        const response = yield call(() =>
            axios.post(endpoint, data)
        );

        yield put(fetchAddProblemSuccess(response.data));

    } catch (error) {
        yield put(fetchAddProblemFailure(error.message));
    }
}

export default function* addProblemWatcher() {
    yield takeLatest(fetchAddProblemStart.type, fetchAddProblemSaga);
}
