import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * DishDetail.
 *
 * @param {Object} props - Component props.
 */
class DishDetail extends Component {
    /**
     * @type {propTypes}
     * @param {Object} dish - The selected dish
     */
    static propTypes = {
      dish: PropTypes.objectOf(PropTypes.object),
    };

    /**
     * @type {defaultProps}
     * @prop {object} - default dish value.
     */
    static defaultProps = {
      dish: {},
    };


    /**
     * Render function.
     *
     * @returns {Object} A dom element for an element.
     */
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
