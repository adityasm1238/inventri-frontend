import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Col,Card,CardBody,CardHeader} from "reactstrap";

class DoughnutChart extends React.Component{
    options={
        maintainAspectRatio:false,
        plugins:{
            legend:{display:false},
        },
        title:{}
    };
    render(){
        return(
            <Col lg="5" xl="4">
                <Card className="shadow mb-4">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">{this.props.title}</h6>
                    </CardHeader>
                
                <CardBody>
                <div class="chart-area">
                    <Doughnut id="dChart" data={{
                        labels:this.props.labels,
                        datasets:[{
                            label:null,
                            backgroundColor:this.props.colors,
                            borderColor:['#ffffff','#ffffff','#ffffff'],
                            data:this.props.data
                        }]
                    }} options={this.options} />
                    
                </div>
                <div className="text-center small mt-4">
                    {
                        this.props.labels.map((label,i)=>(
                            (<span className="mr-2">
                                <i className="fas fa-circle" style={{color:this.props.colors[i]}}></i>&nbsp;{label}
                            </span>)
                        ))
                    }
                </div>
                </CardBody>
                </Card>
            </Col>
            
        );
    }
};

export default DoughnutChart;