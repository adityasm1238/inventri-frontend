import React from 'react';
import { Row } from "reactstrap";
import ButtonGroup from '../../components/buttongroup/ButtonGroup';
import LineChart from '../../components/linechart/LineChart';
import DashCard from '../../components/dashcard/DashCard';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import { getAuthHeader } from "../../utils/LocalStorage";
import axios from 'axios';
import config from '../../config/config';

class DashBoard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            noOfProd:0,
            totalY:0,
            totalM:0,
            totalD:0,
            monthly:null
        }
    }
    componentDidMount()
    {
        let data = {id:this.props.user.userId};
        axios.post(config.apiBaseUri+"/user/getDash",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    noOfProd:res.data.prods,
                    totalY:res.data.totalY,
                    totalM:res.data.totalM,
                    totalD:res.data.totalD,
                    monthly:res.data.monthly
                });
            }).catch(e=>{
                if(e.response.status===401)
                    this.props.handleLogout();
                else
                    this.setState({
                        alertMessage:e.response.data.message,
                        alertVisible:true,
                        alertColor:'danger',
                    });
            });
    }
    render(){
        return(
                <FluidContainer title="Dashboard">
                        <Row>
                            <DashCard title="Sales (annual)" detail={"Rs."+this.state.totalY} icon="calendar" color="primary"/>
                            <DashCard title="Sales (monthly)" detail={"Rs."+this.state.totalM} icon="dollar-sign" color="success"/>
                            <DashCard title="Sales (daily)" detail={"Rs."+this.state.totalD} icon="dollar-sign" color="info"/>
                            <DashCard title="Total Items in Inventory" detail={this.state.noOfProd} color="warning"/>
                        </Row>
                        <Row>
                            <LineChart points={this.state.monthly} labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}/>
                        </Row>
                    <ButtonGroup/>
                </FluidContainer>
        );
        }
};

export default DashBoard;