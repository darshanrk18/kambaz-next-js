import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addNewCourse: (state, { payload: course }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.courses = [...state.courses, course] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c: any) => c._id !== courseId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
    updateCourse: (state, { payload: course }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;