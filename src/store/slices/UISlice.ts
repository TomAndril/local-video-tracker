import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UITypes } from '../../types/UI.types';

const initialState: UITypes = {
  isNewProjectModalOpen: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    handleOpenNewProjectModal: (state, action: PayloadAction<boolean>) => {
      state.isNewProjectModalOpen = action.payload;
    },
  },
});

export default UISlice.reducer;

export const { handleOpenNewProjectModal } = UISlice.actions;
