import * as ActionTypes from './ActionTypes';
import createDishes from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

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
    id,
    category,
    description,
    featured,
    image,
    label,
    name,
    price,
  },
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const commentsLoading = () => ({
  type: ActionTypes.COMMENTS_LOADING,
});

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const fetchDishesAndComments = () => (dispatch) => {
  dispatch(dishesLoading(true));

  const dishes = [];
  const dishesComments = [];


  createDishes.then((dishArray) => {
    dishArray.forEach((dishItem) => {
      const dish = { ...dishItem };
      delete dish.comments;

      const {
        category, description, featured, id, image, label, name, price,
      } = dish;

      dishes.push({
        category, description, featured, id, image, label, name, price,
      });

      const { comments } = dishItem;
      comments.forEach((commentItem) => {
        const {
          dishId, rating, author, sentence, date,
        } = commentItem;

        dishesComments.push({
          id: dishesComments.length, dishId, rating, author, sentence, date,
        });
      });
    });
  });

  setTimeout(() => {
    dispatch(addDishes(dishes));
  }, 2000);

  setTimeout(() => {
    dispatch(addComments(dishesComments));
  }, 3000);
};

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(`${baseUrl}promotions`)
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
};
