import React from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuComponent.scss';
import { Loading } from '../LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';

function RenderMenuItem({ dish }) {
  // console.log('dish', dish);

  return (
    <Col xs={6} md={6} key={dish.id}>
      <Card className="item" key={dish.id}>
        <Link to={`/menu/${dish.id}`}>
          <CardImg src={baseUrl + dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Link>
      </Card>
    </Col>
  );
}

RenderMenuItem.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

RenderMenuItem.defaultProps = {
  dish: {},
};

const Menu = (props) => {
  const { dishes } = props;

  if (dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  const menu = dishes.dishesList.map((dish) => {
    if (dishes.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{dishes.errMess}</h4>
            </div>
          </div>
        </div>
      );
    }

    return (
      <RenderMenuItem key={dish.id} dish={dish} />
    );
  });

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

Menu.propTypes = {
  dishes: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};


export default Menu;
