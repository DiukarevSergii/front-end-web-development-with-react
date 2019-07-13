import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
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
      dish: PropTypes.objectOf(PropTypes.object),
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
            </Row>
          );
        });

        return (
          <div className="comments">
            <Row>
              <h4>Comments</h4>
            </Row>
            <div>
              {selectedDishComments}
            </div>
          </div>
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

      if (dish != null) {
        const {
          image, name, description, comments,
        } = dish;
        return (
          <Row className="show-item">
            <Col xs={6} md={6}>
              <Card className="item">
                <CardImg src={image} alt={name} />
                <CardBody>
                  <CardTitle>{name}</CardTitle>
                  <CardText>{description}</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs={6} md={6}>
              {this.renderComments(comments)}
            </Col>
          </Row>
        );
      }
      return (
        <div />
      );
    }
}

export default DishDetail;
