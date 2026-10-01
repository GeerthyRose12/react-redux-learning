import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import studentReducer from "../features/student/studentSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        students: studentReducer
    }
});