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

export const addDish = (category, description, featured, id, image, label, name, price) => ({ // eslint-disable-line import/prefer-default-export
  type: ActionTypes.ADD_DISH,
  payload: {
    category,
    description,
    featured,
    id,
    image,
    label,
    name,
    price,
  },
});
