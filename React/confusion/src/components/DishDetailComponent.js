import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

class DishDetail extends Component {
    static propTypes = {
      dish: PropTypes.objectOf(PropTypes.object).isRequired,
    };

    render() {
      const { dish } = this.props;

      if (dish != null) {
        const { image, name, description } = dish;
        return (
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg top src={image} alt={name} />
              <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
              </CardBody>
            </Card>
          </div>
        );
      }
      return (
        <div />
      );
    }
}

export default DishDetail;
