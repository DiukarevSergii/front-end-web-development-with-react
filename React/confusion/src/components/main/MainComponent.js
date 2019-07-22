import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Menu from '../menu/MenuComponent';
import DishDetail from '../dish-detail/DishDetailComponent';
import createDishes from '../../shared/dishes';
import Header from '../HeaderComponent';
import Footer from '../FooterComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      selectedDish: null,
    };
  }

  componentDidMount() {
    createDishes.then((result) => {
      this.setState({
        dishes: result,
      });
    });
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const { dishes, selectedDish } = this.state;
    return (
      <div>
        <Header />
        <Container>
          <Menu dishes={dishes} onClick={dishId => this.onDishSelect(dishId)} />
          <DishDetail dish={dishes.filter(dish => dish.id === selectedDish)[0]} />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
