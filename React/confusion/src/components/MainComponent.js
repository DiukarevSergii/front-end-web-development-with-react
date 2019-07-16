import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Container } from 'react-bootstrap';
import Menu from './menu/MenuComponent';
import DishDetail from './dish-detail/DishDetailComponent';
import createDishes from '../shared/dishes';

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
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Container>
          <Menu dishes={dishes} onClick={dishId => this.onDishSelect(dishId)} />
          <DishDetail dish={dishes.filter(dish => dish.id === selectedDish)[0]} />
        </Container>
      </div>
    );
  }
}

export default Main;
