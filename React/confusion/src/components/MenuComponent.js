import React, { Component } from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import DishDetail from './DishDetailComponent';

class Menu extends Component {
  static propTypes = {
    dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    return (
      <DishDetail dish={dish} />
    );
  }

  render() {
    const { dishes } = this.props;
    const { selectedDish } = this.state;

    const menu = dishes.map(dish => (
      // todo: After finish course refactor to css grid
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          {menu}
          {this.renderDish(selectedDish)}
        </div>
      </div>
    );
  }
}

export default Menu;
