import React from "react";
import {Col,Card,CardBody} from "reactstrap";
import { Link } from 'react-router-dom';
import "./BigButtons.css";
class BigButton extends React.Component{
    render(){
        return(
            <Col lg="6" className="mb-4">
                <Link className="LinkDec" to={this.props.to}>
                <Card className={"text-white  shadow bg-"+this.props.bgColor}>
                    <CardBody>
                        <p className="m-0">{this.props.title}</p>
                        <p className="text-white-50 small m-0">{this.props.description}</p>
                    </CardBody>
                </Card>
                </Link>
            </Col>
        );
    }
}

export default BigButton;