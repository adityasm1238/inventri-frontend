import React from 'react';
import { Alert } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { getAuthHeader } from "../../utils/LocalStorage";
import axios from 'axios';
import config from '../../config/config';
import { getDate } from "../../utils/Utils";
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';


class SingleSale extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            alertVisible:false,
            alertMessage:'',
            company:'',
            date:'',
            sales:[],
            alertColor:'danger',
            totalSales:0
        };
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    toggleAlert = ()=>{this.setState({alertVisible:false})};

    componentDidMount(){
        let data = {id:this.props.user.userId,entry_id:this.props.match.params.id};
        axios.post(config.apiBaseUri+"/user/getSalesEntry",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    company:res.data.sales.company,
                    date:getDate(res.data.sales.date),
                    totalSales:res.data.sales.total,
                    sales:res.data.prods.map((sale,i)=>({prodId:i,name:sale.prodId.name,mrp:sale.prodId.mrp,quantity:sale.quantity}))
                })
            }).catch(e=>{
                if(e.response.status===401)
                    this.props.handleLogout();
                else
                    this.setState({
                        error:e.response.data.message,
                        alertMessage:e.response.data.message,
                        alertVisible:true,
                        alertColor:'danger',
                        isLoadingCat:false
                    });
            });
    }
    render()
    {
        return(
           <FluidContainer title="Sales Entry">
                <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.toggleAlert} style={{position:"fixed",right:'1em',zIndex:999}}>
                    {this.state.alertMessage}
                </Alert>
                <CardWithTitle title="Details of The Purchase">
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="company"><strong>To</strong></label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    disabled
                                    value={this.state.company}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="date"><strong>Date</strong></label>
                                <input 
                                    className="form-control" 
                                    type="date" 
                                    value={this.state.date} 
                                    disabled
                                    />
                                </div>
                        </div>
                    </div>
                </CardWithTitle>
                <CardWithTitle title="Products">
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table dataTable my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th> 
                                        <th>MRP</th> 
                                        <th>Total</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        this.state.sales.map(product=>
                                            (
                                            <tr key={product.prodId}>
                                                <td>{product.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>Rs.{product.mrp}</td>
                                                <td>Rs.{product.mrp*product.quantity}</td>
                                            </tr>)
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                       
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total:</strong></td>
                                        <td><strong>Rs.{this.state.totalSales}</strong></td>
                                    </tr>
                                </tfoot>
                               
                            </table>
                        </div>
                </CardWithTitle>
            </FluidContainer>
        );
    }
}

export default withRouter(SingleSale);