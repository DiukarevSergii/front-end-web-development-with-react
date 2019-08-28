import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'react-redux-form';
import Menu from '../menu/MenuComponent';
import Header from '../HeaderComponent';
import Home from '../HomeComponentt';
import Footer from '../FooterComponent';
import About from '../AboutComponent';
import Contact from '../ContactComponent';
import DishDetail from '../dish-detail/DishDetailComponent';
import { postComment, fetchDishesAndComments, fetchPromos } from '../../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, sentence) => dispatch(postComment(dishId, rating, author, sentence)),
  fetchDishesAndComments: () => dispatch(fetchDishesAndComments()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchPromos: () => dispatch(fetchPromos()),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishesAndComments(); // eslint-disable-line
    this.props.fetchPromos(); // eslint-disable-line
  }

  render() {
    const {
      promotions,
      leaders,
      comments,
      dishes,
      postComment, // eslint-disable-line no-shadow
      resetFeedbackForm,
    } = this.props;

    const HomePage = () => (
      <Home
        dish={dishes.dishesList.filter(dish => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}

        promotion={promotions.promosList.filter(promo => promo.featured)[0]}
        promoLoading={promotions.isLoading}
        promoErrMess={promotions.errMess}

        leader={leaders.filter(leader => leader.featured)[0]}
      />
    );

    const DishWithId = ({ match }) => (
      <DishDetail
        dish={dishes.dishesList.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.commentsList ? comments.commentsList.filter(comment => comment.dishId === parseInt(match.params.dishId, 10)) : []}
        postComment={postComment}
      />
    );

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={resetFeedbackForm} />} />
          <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />
          <Redirect to="/ " />
        </Switch>
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.object).isRequired,
  leaders: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dishes: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  postComment: PropTypes.func.isRequired,
  fetchDishesAndComments: PropTypes.func.isRequired,
  fetchPromos: PropTypes.func.isRequired,
  resetFeedbackForm: PropTypes.func.isRequired,
};

Main.defaultProps = {
  comments: {},
  dishes: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
