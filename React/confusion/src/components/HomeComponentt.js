import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './HomeComponent.scss';
import { FadeTransform } from 'react-animation-components';
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
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)',
      }}
    >
      <Card>
        <CardImg src={baseUrl + image} alt={name} className="home" />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          {designation ? <CardSubtitle>{designation}</CardSubtitle> : null}
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
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
    leader, leadersLoading, leadersErrMess,
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
          <RenderCard item={leader} isLoading={leadersLoading} errMess={leadersErrMess} />
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
  leadersLoading: PropTypes.bool.isRequired,
  leadersErrMess: PropTypes.string,
};

Home.defaultProps = {
  dish: {},
  dishesErrMess: '',
  promoErrMess: '',
  leadersErrMess: '',
};

export default Home;
