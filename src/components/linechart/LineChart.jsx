import React from "react";
import {Line} from "react-chartjs-2";
import {Col,Card,CardBody,CardHeader} from "reactstrap";

class LineChart extends React.Component{
    options = {
        maintainAspectRatio:false,
        plugins:{
            legend:{display:false},
        },
        title:{},
        scales:
        {
            xa:
                {
                    grid:{
                        color:'rgb(234, 236, 244)',
                        zeroLineColor:'rgb(234, 236, 244)',
                        drawBorder:false,
                        drawTicks:false,
                        borderDash:[2],
                        zeroLineBorderDash:[2],
                        drawOnChartArea:false
                    },
                    ticks:{
                        fontColor:"#858796",
                        padding:20
                    }
                }   
            ,ya:
                {
                    grid:{
                        color:'rgb(234, 236, 244)',
                        zeroLineColor:'rgb(234, 236, 244)',
                    
                        drawBorder:false,
                        drawTicks:false,
                        borderDash:[2],
                        zeroLineBorderDash:[2]
                    },
                    ticks:{fontColor:"#858796",padding:20}
                }
            }
    }
    render(){
        return(
            <Col>
                <Card className="shadow mb-4">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">Earnings Overview</h6>
                    </CardHeader>
                
                <CardBody>
                <div className="chart-area">
                    {
                        this.props.points?(<Line id="lineChart" data={{
                            labels:this.props.labels,
                            datasets:[{
                                label:'Earnings',
                                fill:true,
                                lineTension: 0.3,
                                data:this.props.points,
                                backgroundColor:'rgba(78, 115, 223, 0.05)',
                                borderColor:'rgba(78, 115, 223, 1)',
                                yAxisID: 'ya',
                                xAxisID: 'xa',
                            }]
                        }} options={this.options} />):null
                    }
                    
                </div>
                </CardBody>
                </Card>
            </Col>
        );
    }
};

export default LineChart;