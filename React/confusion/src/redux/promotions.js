import * as ActionTypes from './ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const Promotions = (state = {
  isLoading: true,
  errMess: null,
  promosList: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state, isLoading: false, errMess: null, promosList: action.payload,
      };

    case ActionTypes.PROMOS_LOADING:
      return {
        ...state, isLoading: true, errMess: null, promosList: [],
      };

    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
