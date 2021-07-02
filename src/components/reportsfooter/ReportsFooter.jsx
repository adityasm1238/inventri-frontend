import React from "react";
import { Row,Col,Pagination } from "reactstrap";
import "./ReportsFooter.css";

class ReportsFooter extends React.Component{
    render(){
        return(
            this.props.page?
                <Row>
                    <Col md={6} className="align-self-center">
                        <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing {(this.props.page-1)*10+1} to {Math.min(this.props.page*10,this.props.total)} of {this.props.total}</p>
                    </Col>
                    <Col md={6}>
                        <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                            <Pagination>
                                <li className={"page-item "+((this.props.page===1)?"disabled":"")}><button className="page-link" aria-label="Previous" onClick={this.props.loadPrevious}><span aria-hidden="true">«</span></button></li>
                                {
                                    this.props.page>1?<li className="page-item"><button className="page-link cur" onClick={this.props.loadPrevious}>{this.props.page-1}</button></li>:null
                                }
                                
                                <li className="page-item active"><button className="page-link">{this.props.page}</button></li>
                                {
                                    this.props.next>=0? <li className="page-item"><button  onClick={this.props.loadNext} className="page-link cur">{this.props.page+1}</button></li>:null
                                }
                               
                                <li className={"page-item "+((this.props.next===-1)?"disabled":"")}><button className="page-link" onClick={this.props.loadNext} aria-label="Next"><span aria-hidden="true">»</span></button></li>
                            </Pagination>
                        </nav>
                    </Col>
                </Row>:null
        );
    }
}

export default ReportsFooter;