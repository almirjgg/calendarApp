import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDatemodalOpen: false,
  },
  reducers: {
    onDateToggleModalOpen: state => {
      state.isDatemodalOpen = !state.isDatemodalOpen;
    },
  },
});

export const { onDateToggleModalOpen } = uiSlice.actions;
