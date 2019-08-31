import * as ActionTypes from './ActionTypes';

export const Comments = (state = { //eslint-disable-line
  isLoading: true,
  errMess: null,
  commentsList: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state, isLoading: false, errMess: null, commentsList: action.payload,
      };

    case ActionTypes.ADD_COMMENT: {
      alert('ActionTypes.ADD_COMMENT');

      const comment = action.payload;
      return {
        ...state, isLoading: false, errMess: null, commentsList: state.commentsList.concat(comment),
      };
    }

    case ActionTypes.COMMENTS_LOADING:
      return {
        ...state, isLoading: true, errMess: null, commentsList: [],
      };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
