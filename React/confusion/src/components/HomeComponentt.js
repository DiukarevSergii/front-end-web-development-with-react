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
  image: PropTypes.objectOf(PropTypes.object),
  item: PropTypes.objectOf(PropTypes.object),
  designation: PropTypes.objectOf(PropTypes.object),
  name: PropTypes.objectOf(PropTypes.object),
  description: PropTypes.objectOf(PropTypes.object),
};

RenderCard.defaultProps = {
  image: {},
  item: {},
  designation: {},
  name: {},
  description: {},

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
  dish: PropTypes.arrayOf(PropTypes.object),
  promotion: PropTypes.arrayOf(PropTypes.object).isRequired,
  leader: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Home.defaultProps = {
  dish: {},

};

export default Home;
