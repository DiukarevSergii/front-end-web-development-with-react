import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'react-redux-form';
import Menu from '../menu/Menu';
import Header from '../header/Header';
import Home from '../home/Home';
import Footer from '../footer/Footer';
import About from '../about/About';
import Contact from '../contact/Contact';
import DishDetail from '../dish-detail/DishDetail';
import {
  postComment as postCommentRedux, postFeedback as postFeedbackRedux,
  fetchDishesAndComments, fetchPromos, fetchLeaders,
} from '../../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, sentence) => dispatch(postCommentRedux(dishId, rating, author, sentence)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedbackRedux(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishesAndComments: () => dispatch(fetchDishesAndComments()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishesAndComments(); // eslint-disable-line
    this.props.fetchPromos(); // eslint-disable-line
    this.props.fetchLeaders(); // eslint-disable-line
  }

  render() {
    const {
      promotions,
      leaders,
      comments,
      dishes,
      postComment,
      resetFeedbackForm,
      postFeedback,
    } = this.props;

    const HomePage = () => (
      <Home
        dish={dishes.dishesList.filter(dish => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}

        promotion={promotions.promosList.filter(promo => promo.featured)[0]}
        promoLoading={promotions.isLoading}
        promoErrMess={promotions.errMess}

        leader={leaders.leadersList.filter(leader => leader.featured)[0]}
        leadersLoading={leaders.isLoading}
        leadersErrMess={leaders.errMess}
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
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={resetFeedbackForm} postFeedback={postFeedback} />} />
          <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />
          <Redirect to="/ " />
        </Switch>
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  promotions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  leaders: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dishes: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  postComment: PropTypes.func.isRequired,
  fetchDishesAndComments: PropTypes.func.isRequired,
  fetchPromos: PropTypes.func.isRequired,
  resetFeedbackForm: PropTypes.func.isRequired,
  postFeedback: PropTypes.func.isRequired,
};

Main.defaultProps = {
  comments: {},
  dishes: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
