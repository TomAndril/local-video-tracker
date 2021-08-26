import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UITypes } from '../../types/UI.types';

const initialState: UITypes = {
  isNewProjectModalOpen: false,
  isRenameProjectModalOpen: false,
  layoutType: localStorage.getItem('layoutType') || 'grid',
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    handleOpenNewProjectModal: (state, action: PayloadAction<boolean>) => {
      state.isNewProjectModalOpen = action.payload;
    },
    handleOpenRenameProjectModal: (state, action: PayloadAction<boolean>) => {
      state.isRenameProjectModalOpen = action.payload;
    },
    handleChangeLayoutType: (
      state,
      action: PayloadAction<UITypes['layoutType']>
    ) => {
      state.layoutType = action.payload;
      localStorage.setItem('layoutType', action.payload);
    },
  },
});

export default UISlice.reducer;

export const {
  handleOpenNewProjectModal,
  handleOpenRenameProjectModal,
  handleChangeLayoutType,
} = UISlice.actions;
