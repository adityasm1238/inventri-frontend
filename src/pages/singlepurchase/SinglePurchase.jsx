import React from 'react';
import { Alert } from 'reactstrap';
import { getAuthHeader } from "../../utils/LocalStorage";
import axios from 'axios';
import config from '../../config/config';
import { getDate } from "../../utils/Utils";
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';

class SinglePurchase extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            alertVisible:false,
            alertMessage:'',
            company:'',
            date:'',
            billId:'',
            purchases:[],
            alertColor:'danger'
        };
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    toggleAlert = ()=>{this.setState({alertVisible:false})};

    componentDidMount(){
        let data = {id:this.props.user.userId,entry_id:this.props.match.params.id};
        axios.post(config.apiBaseUri+"/user/getPurchaseEntry",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    company:res.data.purchase.company,
                    date:getDate(res.data.purchase.date),
                    billId:res.data.purchase.billId,
                    purchases:res.data.prods.map((prod,i)=>({prodId:i,name:prod.prodId.name,quantity:prod.quantity}))

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
   
    render()
    {
        return(
            <FluidContainer title="Purchase Entry">
                <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.toggleAlert} style={{position:"fixed",right:'1em',zIndex:999}}>
                    {this.state.alertMessage}
                </Alert>
                <CardWithTitle title="Details of The Purchase">  
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="company"><strong>From</strong></label>
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
                                <label htmlFor="billId"><strong>Bill No.</strong></label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    disabled
                                    value={this.state.billId}/>
                                </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="date"><strong>Date</strong></label>
                                <input 
                                    className="form-control" 
                                    type="date" 
                                    disabled
                                    value={this.state.date}/>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.purchases.map(product=>
                                        (
                                        <tr key={product.prodId}>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                        </tr>)
                                    )
                                }    
                            </tbody>
                        </table>
                    </div> 
               </CardWithTitle>
            </FluidContainer>
        );
    }
}

export default SinglePurchase;