import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import './HomeComponent.scss';

function RenderCard({ item }) {
  const {
    image, designation, name, description,
  } = item;

  return (
    <Card>
      <CardImg src={image} alt={name} className="home" />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        {designation ? <CardSubtitle>{designation}</CardSubtitle> : null }
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

RenderCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),

};

RenderCard.defaultProps = {
  item: {},
};

function Home(props) {
  console.log('home props', props);

  const { dish, promotion, leader } = props;


  if (!isEmpty(dish)) {
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderCard item={dish} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={promotion} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={leader} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div />
  );
}

Home.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  promotion: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  leader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
};

Home.defaultProps = {
  dish: {},

};

export default Home;
