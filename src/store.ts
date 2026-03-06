import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  username: string;
  counter: number;
};

const initialState: AppState = {
  username: 'Гость',
  counter: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    increment(state) {
      state.counter += 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
  },
});

export const { setUsername, increment, decrement } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

