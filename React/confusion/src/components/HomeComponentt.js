import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './HomeComponent.scss';
import { Loading } from './LoadingComponent';

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (errMess) {
    return (
      <h4>{errMess}</h4>
    );
  }

  const {
    image, designation, name, description,
  } = item;

  return (
    <Card>
      <CardImg src={image} alt={name} className="home" />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        {designation ? <CardSubtitle>{designation}</CardSubtitle> : null}
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

RenderCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  isLoading: PropTypes.bool,
  errMess: PropTypes.string,
};

RenderCard.defaultProps = {
  item: {},
  isLoading: false,
  errMess: null,
};

function Home(props) {
  const {
    dish, promotion, leader, dishesLoading, dishesErrMess,
  } = props;

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={promotion} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={leader} isLoading={false} errMess={null} />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  promotion: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  leader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  dishesLoading: PropTypes.bool.isRequired,
  dishesErrMess: PropTypes.string,
};

Home.defaultProps = {
  dish: {},
  dishesErrMess: '',
};

export default Home;
