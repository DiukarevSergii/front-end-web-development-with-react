import * as ActionTypes from './ActionTypes';

export const Dishes = (state = { //eslint-disable-line
  isLoading: true,
  errMess: null,
  dishesList: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state, isLoading: false, errMess: null, dishesList: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      return {
        ...state, isLoading: true, errMess: null, dishesList: [],
      };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_DISH: {
      const dish = action.payload;
      dish.id = state.length;
      return state.concat(dish);
    }
    default:
      return state;
  }
};
