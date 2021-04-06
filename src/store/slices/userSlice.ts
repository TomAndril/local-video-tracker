import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types/store.types';

const initialState: UserState = {
  selectedProjectId: null,
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
  },
});

export default userSlice.reducer;
