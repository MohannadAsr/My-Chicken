import { createSlice } from '@reduxjs/toolkit';
import {
  ModeSwitch,
  fetchPosts,
  switchAlert,
  switchDialog,
  switchMenuValue,
  switchProfile,
} from '@src/actions/AppActions';

export class AppReducerState {
  mode: 'dark' | 'light' = 'light';
  status: string = '';
  posts: any[] = [];
  authDialog: boolean = false;
  menuStatus: boolean = false;
  activeProfile: boolean = false;
  showDeleteAlert: boolean = false;
}

const initialState: AppReducerState = { ...new AppReducerState() };

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    switchMode: ModeSwitch,
    switchAuthDialog: switchDialog,
    switchMenu: switchMenuValue,
    switchActiveProfile: switchProfile,
    switchDeleteAlert: switchAlert,
  },
});

export const {
  switchMode,
  switchAuthDialog,
  switchMenu,
  switchActiveProfile,
  switchDeleteAlert,
} = AppSlice.actions;
export default AppSlice.reducer;
