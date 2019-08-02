import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => { //eslint-disable-line
  const store = createStore(
    Reducer, // reducer
    initialState, // our initialState
  );

  return store;
};
