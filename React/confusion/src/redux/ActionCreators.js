import * as ActionTypes from './ActionTypes';
import createDishes from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

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

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

const insertComment = (dishId, rating, author, comment, date) => {
  console.log('insert comment');
  const newComment = {
    dishId,
    rating,
    author,
    comment,
  };
  newComment.date = date || new Intl
    .DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .format(new Date());

  return fetch(`${baseUrl}comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .catch((error) => {
      console.log('insert comments', error.message);
      throw new Error(error);
    });
};

export const postComment = (dishId, rating, author, comment, date) => (dispatch) => {
  console.log('post comment');

  insertComment(dishId, rating, author, comment, date)
    .then(response => dispatch(addComment(response)))
    .catch((error) => { console.log('post comments', error.message); alert(`Your comment could not be posted\nError: ${error.message}`); });
};

export const postComments = (comments) => {
  console.log('populate comments');

  comments.forEach((comment) => {
    const {
      dishId, rating, author, sentence, date,
    } = comment;

    insertComment(dishId, rating, author, sentence, date)
      .then(response => response)
      .catch((error) => {
        console.log('post comments', error.message);
        // alert(`Your comment could not be posted\nError: ${error.message}`);
      });
  });
};

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
    // fixme TypeError: Failed to fetch
    //   postComments(dishesComments);

    dispatch(addComments(dishesComments));
  }, 1000);
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
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw new Error(error.message);
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};
