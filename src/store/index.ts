import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slices/projectsSlice';
import UISlice from './slices/UISlice';

const store = configureStore({
  reducer: {
    projects: projectsSlice,
    UI: UISlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
