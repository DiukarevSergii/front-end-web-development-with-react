import React, { Component } from 'react';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

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
    if (dish != null) {
      const { image, name, description } = dish;
      return (
        <Card>
          <CardImg top src={image} alt={name} />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText>{description}</CardText>
          </CardBody>
        </Card>
      );
    }
    return (
      <div />
    );
  }

  render() {
    const { dishes } = this.props;
    const { selectedDish } = this.state;

    const menu = dishes.map(dish => (
      // todo refactor to flex box
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
          <CardImg width="10%" src={dish.image} alt={dish.name} />
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
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(selectedDish)}
        </div>
      </div>
    );
  }
}

export default Menu;
