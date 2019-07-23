import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../menu/MenuComponent';
import createDishes from '../../shared/dishes';
import Header from '../HeaderComponent';
import Home from '../HomeComponentt';
import Footer from '../FooterComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { dishes: [] };
  }

  componentDidMount() {
    createDishes.then((result) => {
      this.setState({
        dishes: result,
      });
    });
  }

  render() {
    const HomePage = () => (
      <Home />
    );


    const { dishes } = this.state;
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
