import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true,
});
