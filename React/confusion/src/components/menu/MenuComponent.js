import React, { Component } from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import DishDetail from '../dish-detail/DishDetailComponent';

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

  renderDish(dish = {}) {
    return (
      <DishDetail dish={dish} />
    );
  }

  render() {
    const { dishes } = this.props;
    const { selectedDish } = this.state;

    const menu = dishes.map(dish => (
      // todo: After finish course refactor to css grid
      <Col key={dish.id} xs={6} md={6}>
        <Card key={dish.id} className="item" onClick={() => this.onDishSelect(dish)}>
          <CardImg src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </Col>
    ));

    return (
      <Container>
        <Row className="show-item">
          {menu}
        </Row>
        {this.renderDish(selectedDish)}
      </Container>
    );
  }
}

export default Menu;
