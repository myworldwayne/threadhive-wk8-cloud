import { createSlice } from '@reduxjs/toolkit';

const loadToken = () => {
  const t = localStorage.getItem('token');
  return t && t !== 'undefined' && t !== 'null' ? t : null;
};

const loadUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: loadToken(),
    user: loadUser(),
  },
  reducers: {
    loginUser(state, action) {
      const data = action.payload;
      if (data.token) {
        localStorage.setItem('token', data.token);
        state.token = data.token;
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        state.user = data.user;
      }
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
    },
    updateUser(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { loginUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
