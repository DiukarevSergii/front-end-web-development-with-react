import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../menu/MenuComponent';
import createDishes from '../../shared/dishes';
import Header from '../HeaderComponent';
import Home from '../HomeComponentt';
import Footer from '../FooterComponent';
import Contact from '../ContactComponent';
import { PROMOTIONS } from '../../shared/promotions';
import { LEADERS } from '../../shared/leaders';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      promotions: PROMOTIONS,
      leaders: LEADERS,
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
    const { dishes, promotions, leaders } = this.state;

    const HomePage = () => (
      <Home
        dish={dishes.filter(dish => dish.featured)[0]}
        promotion={promotions.filter(promo => promo.featured)[0]}
        leader={leaders.filter(leader => leader.featured)[0]}
      />
    );

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
