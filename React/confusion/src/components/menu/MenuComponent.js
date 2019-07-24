import React from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

function RenderMenuItem({ dish }) {
  return (
    <Col xs={6} md={6} key={dish.id}>
      <Card className="item" key={dish.id}>
        <CardImg src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
    </Col>
  );
}

RenderMenuItem.propTypes = {
  dish: PropTypes.objectOf(PropTypes.object).isRequired,
};

const Menu = (props) => {
  const { dishes } = props;

  const menu = dishes.map(dish => (
    <RenderMenuItem dish={dish} />
  ));

  return (
    <Row className="show-item">
      {menu}
    </Row>
  );
};

Menu.propTypes = { dishes: PropTypes.arrayOf(PropTypes.object).isRequired };


export default Menu;
