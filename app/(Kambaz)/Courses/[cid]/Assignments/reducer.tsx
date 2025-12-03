import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";

const initialState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (assignment: any) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    editAssignment: (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload
          ? { ...assignment, editing: true }
          : assignment
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;