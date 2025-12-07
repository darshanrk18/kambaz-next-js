import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.modules = [...state.modules, module] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (m: any) => m._id !== moduleId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
    updateModule: (state, { payload: module }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;