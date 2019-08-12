import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, sentence) => ({ // eslint-disable-line import/prefer-default-export
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    sentence,
  },
});
