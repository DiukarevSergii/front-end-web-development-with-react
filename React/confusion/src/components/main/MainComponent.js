import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu/MenuComponent';
import createDishes from '../../shared/dishes';
import Header from '../HeaderComponent';
import Home from '../HomeComponentt';
import Footer from '../FooterComponent';
import About from '../AboutComponent';
import Contact from '../ContactComponent';
import DishDetail from '../dish-detail/DishDetailComponent';
import { addComment } from '../../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),

});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
    };
  }

  componentDidMount() {
    createDishes.then((result) => {
      this.setState({
        dishes: result,
      });
    });
  }

  render() {
    const {
      promotions,
      leaders,
      comments,
      addComment, // eslint-disable-line
    } = this.props;

    const { dishes } = this.state;

    const HomePage = () => (
      <Home
        dish={dishes.filter(dish => dish.featured)[0]}
        promotion={promotions.filter(promo => promo.featured)[0]}
        leader={leaders.filter(leader => leader.featured)[0]}
      />
    );

    const DishWithId = ({ match }) => (
      <DishDetail
        dish={dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
        addComment={addComment}
      />
    );

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
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
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  addComment: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
