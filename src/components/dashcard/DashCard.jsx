import React from 'react';
import { Col,Card,CardBody,Row} from "reactstrap";

class DashCard extends React.Component{
    render(){
        return(
            <Col md={6} xl={3} className="mb-4">
                <Card className={"shadow py-2 border-left-"+this.props.color}>
                    <CardBody>
                        <Row className="align-items-center no-gutters">
                            <Col className="mr-2">
                                <div className={"text-uppercase font-weight-bold text-xs mb-1 text-"+this.props.color}><span>{this.props.title}</span></div>
                                <div className="text-dark font-weight-bold h5 mb-0"><span>{this.props.detail}</span></div>
                            </Col>
                            {
                                this.props.icon?
                                (
                                    <div className="col-auto"><i className={"fas fa-2x text-gray-300 fa-"+this.props.icon}></i></div>
                                ):null
                            }
                            
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default DashCard;