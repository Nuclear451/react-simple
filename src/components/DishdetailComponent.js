import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderComments(dish){
        if (dish == null || dish.comments == null){
            return(
                <div></div>
            )
        }

        const comment = dish.comments.map(
            (comm) => {
                return(
                    <li key={comm.id}>
                        <div>
                            {comm.comment}
                        </div>
                        <div>
                            -- {comm.author} {comm.date}
                        </div>
                    </li>
                )
            }
        );

        return (
            <h4>Comments</h4>,
            <ul className="list-unstyled">
                {comment}
            </ul>
        )
    }

    renderDish(dish){
        if (dish == null){
            return (
                <div></div>
            )
        }

        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    render() {
        console.log(this.props);
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;