import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({ // eslint-disable-line import/prefer-default-export
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});
