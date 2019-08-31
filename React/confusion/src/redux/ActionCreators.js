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

export const postComment = (dishId, rating, author, comment, date) => (dispatch) => {
  alert('inside postComment');

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
    .then(response => dispatch(addComment(response)))
    .catch((error) => {
      alert(`Your comment could not be posted\nError: ${error.message}`);
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

const getComments = () => fetch(`${baseUrl}comments`)
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
  .catch(error => error.message);

export const fetchDishesAndComments = () => async (dispatch) => {
  dispatch(dishesLoading(true));
  dispatch(commentsLoading(true));

  const dishes = [];

  const dishesComments = await getComments();
  const populateComments = dishesComments ? dishesComments.length > 0 : [];

  const dishArray = await createDishes();

  dishArray.forEach((dishItem) => {
    const dish = { ...dishItem };
    delete dish.comments;

    const {
      category, description, featured, id, image, label, name, price,
    } = dish;

    dishes.push({
      category, description, featured, id, image, label, name, price,
    });

    if (!populateComments) {
      const { comments } = dishItem;
      comments.forEach((commentItem) => {
        const {
          dishId, rating, author, sentence, date,
        } = commentItem;

        dishesComments.push({
          id: dishesComments.length, dishId, rating, author, sentence, date,
        });
      });
    }
  });

  dispatch(addDishes(dishes));

  // todo: extend with post comment. for case if comments array is initially empty
  //   postComments(dishesComments);

  if (dishesComments.length) {
    dispatch(addComments(dishesComments));
  }
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

export const addLeaders = promos => ({
  type: ActionTypes.ADD_LEADERS,
  payload: promos,
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  return fetch(`${baseUrl}leaders`)
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
    .then(promos => dispatch(addLeaders(promos)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const receiveFeedback = feedback => ({
  type: ActionTypes.RECEIVE_FEEDBACK,
  payload: feedback,
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
  const newFeedback = {
    firstname, lastname, telnum, email, agree, contactType, message,
  };

  newFeedback.date = new Intl
    .DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .format(new Date());


  return fetch(`${baseUrl}feedback`, {
    method: 'POST',
    body: JSON.stringify(newFeedback),
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
    .then(promos => dispatch(receiveFeedback(promos)))
    .catch((error) => {
      alert(`Your feedback could not be posted\nError: ${error.message}`);
    });
};
