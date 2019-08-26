import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './HomeComponent.scss';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
      <CardImg src={baseUrl + image} alt={name} className="home" />
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
    dish, dishesLoading, dishesErrMess,
    promotion, promoLoading, promoErrMess,
    leader,
  } = props;

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={promotion} isLoading={promoLoading} errMess={promoErrMess} />
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
  dishesLoading: PropTypes.bool.isRequired,
  dishesErrMess: PropTypes.string,
  promotion: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  promoLoading: PropTypes.bool.isRequired,
  promoErrMess: PropTypes.string,
  leader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
};

Home.defaultProps = {
  dish: {},
  dishesErrMess: '',
  promoErrMess: '',
};

export default Home;