import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  ModalHeader,
  ModalBody,
  Label,
  Button,
  Modal,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import './DishDetailComponent.scss';
import { Control, LocalForm, Errors } from 'react-redux-form';

class RenderComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  }

  handleSubmit = (values) => {
    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
  };

  render() {
    const { isModalOpen } = this.state;
    const { comments } = this.props;

    const required = val => val && val.length;
    const maxLength = len => val => !(val) || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

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
          <Row>
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-sign-in fa-lg" />
              {' '}
            Submit Comment
            </Button>
            <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={2}>Rating</Label>
                    <Col md={12}>
                      <Control.select
                        model=".rating"
                        id="rating"
                        name="rating"
                        className="form-control"
                        defaultValue="1"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="Your Name" md={12}>Your Name</Label>
                    <Col md={12}>
                      <Control.text
                        model=".yourname"
                        id="yourname"
                        name="yourname"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                          required, minLength: minLength(3), maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".yourname"
                        show="touched"
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less',
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="message" md={12}>Comment</Label>
                    <Col md={12}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="12"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
              </ModalBody>
            </Modal>
          </Row>
        </Col>
      );
    }
    return '';
  }
}

RenderComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @type {propTypes}
 * @param {Object} dish - The selected dish
 */
function RenderDish({ dish }) {
  const { image, name, description } = dish;
  return (
    <Col xs={6} md={6} key={dish.id}>
      <Card className="item">
        <CardImg src={image} alt={name} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

RenderDish.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

/**
 * @type {defaultProps}
 * @prop {object} - default dish value.
 */
RenderDish.defaultProps = {
  dish: {},
};

/**
     * Render function.
     *
     * @returns {Object} A dom element for an element.
     */
const DishDetail = (props) => {
  const { dish } = props;

  if (!isEmpty(dish)) {
    const { comments } = dish;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <Row className="show-item">
          <RenderDish dish={dish} />
          <RenderComments comments={comments} />
        </Row>
      </div>
    );
  }
  return (
    <div />
  );
};

DishDetail.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

/**
 * @type {defaultProps}
 * @prop {object} - default dish value.
 */
DishDetail.defaultProps = {
  dish: {},
};

export default DishDetail;
