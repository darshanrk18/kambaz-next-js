import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Courses/enrollmentsReducer";
import counterReducer from "../Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";

const store = configureStore({
 reducer: { 
    coursesReducer, 
    modulesReducer, 
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    counterReducer
},
});

export default store;