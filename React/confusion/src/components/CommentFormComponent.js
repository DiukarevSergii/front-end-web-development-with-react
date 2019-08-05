import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  Button, Label, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';

class CommentForm extends Component {
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

      const required = val => val && val.length;
      const maxLength = len => val => !(val) || (val.length <= len);
      const minLength = len => val => val && (val.length >= len);

      return (
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
      );
    }
}

export default CommentForm;
