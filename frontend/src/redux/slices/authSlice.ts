import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
  role: 'admin' | 'member' | 'guest';
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  role: 'guest',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: string; role: 'admin' | 'member' | 'guest' }>) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.role = 'guest';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
