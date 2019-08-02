import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
  dishes: [],
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS,
};

export const Reducer = (state = initialState, action) => state; //eslint-disable-line
