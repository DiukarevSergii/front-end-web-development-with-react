import * as ActionTypes from './ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const Feedback = (state = { feedback: {} }, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_FEEDBACK: {
      console.log('inside receive feedback');
      alert('inside receive feedback');
      return { ...state, lastFeedback: action.payload };
    }
    default:
      return state;
  }
};
