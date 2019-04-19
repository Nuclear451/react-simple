import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


function RenderComments({dish}) {
    if (dish == null || dish.comments == null) {
        return (
            <div></div>
        )
    }

    const comment = dish.comments.map(
        (comm) => {
            return (
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
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.dish}/>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;