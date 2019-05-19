import React, {Component} from 'react';
import {
    Card, CardBody, CardImg, CardText,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col
} from "reactstrap";
import {Link} from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";

function RenderComments({dish}) {
    console.log(dish);
    if (dish == null) {
        return (
            <div></div>
        )
    }

    const comment = dish.map(
        (comm) => {
            let formattedDate;
            if (comm.date != null) {
                let commentDate = new Date(comm.date);
                formattedDate = commentDate.getFullYear() + "-" + (commentDate.getMonth() + 1) + "-" + commentDate.getDate() + " " + commentDate.getHours() + ":" + commentDate.getMinutes() + ":" + commentDate.getSeconds();
            }


            return (
                <li key={comm.id}>
                    <div>
                        {comm.comment}
                    </div>
                    <div>
                        -- {comm.author}, {formattedDate}
                    </div>
                    <hr/>
                </li>
            )
        }
    );

    return (
        <div>
            <ul className="list-unstyled">
                {comment}
            </ul>
            <CommentForm/>
        </div>
    )
}

function RenderDish({dish}) {
    if (dish == null) {
        return (
            <div></div>
        )
    }

    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row ">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.comments}/>
                </div>
            </div>
        </div>
    );
};

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    maxLength = (len) => (val) => !(val) || (val.length <= len);
    minLength = (len) => (val) => (val) && (val.length >= len);

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSubmit(values) {
        console.log("Current state is: ", JSON.stringify(values));
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button type="submit" onClick={this.toggle}>Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Label htmlFor="lastName">Rating</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating"
                                                    name="firstName"
                                                    className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Label htmlFor="author">Your Name</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.text model=".author" id="author"
                                                  name="author" placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength: this.minLength(3),
                                                      maxLength: this.maxLength(15)
                                                  }}
                                    />
                                </Col>
                                <Col md={12}>
                                    <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be less than 15 characters'
                                            }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={10}>
                                    <Label htmlFor="comment">Comment</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default DishDetail;