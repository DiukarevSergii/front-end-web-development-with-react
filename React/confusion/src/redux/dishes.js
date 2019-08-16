import * as ActionTypes from './ActionTypes';

export const Dishes = (state = [], action) => { //eslint-disable-line

  switch (action.type) {
    case ActionTypes.ADD_DISH: {
      const dish = action.payload;
      dish.id = state.length;

      return state.concat(dish);
    }
    default:
      return state;
  }
};
