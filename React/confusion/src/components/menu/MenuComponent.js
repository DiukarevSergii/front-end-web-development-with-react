import React from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuComponent.scss';

function RenderMenuItem({ dish }) {
  return (
    <Col xs={6} md={6} key={dish.id}>
      <Card className="item" key={dish.id}>
        <Link to={`/menu/${dish.id}`}>
          <CardImg src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Link>
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
    <div>
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <Row xs={12} md={12} className="menu">
          <h3>Menu</h3>
          <hr />
        </Row>
      </div>
      <Row className="show-item">
        {menu}
      </Row>
    </div>
  );
};

Menu.propTypes = { dishes: PropTypes.arrayOf(PropTypes.object).isRequired };


export default Menu;
