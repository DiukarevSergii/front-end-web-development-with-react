import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import './DishDetailComponent.scss';

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
      dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    };

    /**
     * @type {defaultProps}
     * @prop {object} - default dish value.
     */
    static defaultProps = {
      dish: {},
    };

    renderComments(comments = []) {
      if (comments.length > 0) {
        const selectedDishComments = comments.map((comment) => {
          const {
            id, author, data, sentence,
          } = comment;

          return (
            <Row key={id}>
              <CardText>{sentence}</CardText>
              <CardText>{`-- ${author}, ${data}`}</CardText>
              <CardText> </CardText>
              <CardText> </CardText>
            </Row>
          );
        });

        return (
          <Col xs={6} md={6}>
            <Row className="item">
              <h4>Comments</h4>
            </Row>
            <Row className="item">
              {selectedDishComments}
            </Row>
          </Col>
        );
      }
      return '';
    }

    /**
     * Render function.
     *
     * @returns {Object} A dom element for an element.
     */
    render() {
      const { dish } = this.props;

      if (!isEmpty(dish)) {
        const {
          image, name, description, comments,
        } = dish;
        return (
          <Row className="show-item">
            <Col xs={6} md={6} key={dish.id}>
              <Card className="item">
                <CardImg src={image} alt={name} />
                <CardBody>
                  <CardTitle>{name}</CardTitle>
                  <CardText>{description}</CardText>
                </CardBody>
              </Card>
            </Col>
            {this.renderComments(comments)}
          </Row>
        );
      }
      return (
        <div />
      );
    }
}

export default DishDetail;
