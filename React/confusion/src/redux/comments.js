import * as ActionTypes from './ActionTypes';

export const Comments = (state = [], action) => { //eslint-disable-line

  switch (action.type) {
    case ActionTypes.ADD_COMMENT: {
      const comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();

      return state.concat(comment);
    }
    default:
      return state;
  }
};
