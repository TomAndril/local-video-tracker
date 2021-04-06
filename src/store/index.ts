import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slices/projectsSlice';
import UISlice from './slices/UISlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    projects: projectsSlice,
    UI: UISlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
