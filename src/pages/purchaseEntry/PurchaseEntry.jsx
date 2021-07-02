import React from 'react';
import Select from 'react-select';
import { Alert } from 'reactstrap';
import { getAuthHeader } from "../../utils/LocalStorage";
import axios from 'axios';
import config from '../../config/config';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';


class PurchaseEntry extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            categories : [],
            products:[],
            isLoading:false,
            isLoadingCat:true,
            isLoadingProd:false,
            alertVisible:false,
            selectedCategory:null,
            selectedProduct:null,
            alertMessage:'',
            quantity:1,
            company:'',
            date:'',
            billId:'',
            purchases:[],
            alertColor:'danger'
        };
        this.toggleAlert = this.toggleAlert.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleAlert = ()=>{this.setState({alertVisible:false})};

    componentDidMount(){
        let data = {id:this.props.user.userId};
        axios.post(config.apiBaseUri+"/user/getCategories",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({categories:res.data.map(category=>({label:category.name,value:category._id})),isLoadingCat:false});
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

    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }

    handleSelectCategory = (value)=>{
        if(value===null)
        {
            this.setState({selectedCategory:null});
        }
        else
        {
            this.setState({selectedCategory:value,selectedProduct:null,isLoadingProd:true},()=>{this.loadProducts(this.state.selectedCategory.value)});
        }
           
    };

    loadProducts = (cat_id)=>{
        let data = {id:this.props.user.userId,cat_id:cat_id};
        axios.post(config.apiBaseUri+"/user/getProducts",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({products:res.data.map(category=>({label:category.name,value:category._id})),isLoadingProd:false});
            }).catch(e=>{
                if(e.response.status===401)
                    this.props.handleLogout();
                else
                    this.setState({
                        error:e.response.data.message,
                        alertMessage:e.response.data.message,
                        alertVisible:true,
                        alertColor:'danger',
                        isLoadingProd:false
                    });
            });
    };

    handleSelectProduct = (value)=>{
        if(value===null)
        {
            this.setState({selectedProduct:null});
        }
        else
            this.setState({selectedProduct:value});
    };

    handleAddProduct = event=>{
        event.preventDefault();
        if(this.state.selectedCategory===null)
            this.setState({alertVisible:true,alertMessage:"Category is required",alertColor:'danger'});
        else if(this.state.selectedProduct===null)
            this.setState({alertVisible:true,alertMessage:"Product is required",alertColor:'danger'});
        else{
            let idx = this.state.purchases.findIndex((product=>product.prodId===this.state.selectedProduct.value));
            if(idx>=0)
            {
                let items = [...this.state.purchases];
                let item = {
                    ...items[idx]
                };
                item.quantity = item.quantity + parseInt(this.state.quantity);
                items[idx] = item;
                this.setState({purchases:items,selectedProduct:null,quantity:1});
            }
            else{
                let newProd = {
                    name:this.state.selectedProduct.label,
                    quantity:parseInt(this.state.quantity),
                    prodId: this.state.selectedProduct.value
                }
                this.setState({purchases:[...this.state.purchases,newProd],selectedProduct:null,quantity:1});
            }

            
        }
        console.log(this.state);
    };

    handleSubmit = event=>{
        event.preventDefault();
        if(this.state.purchases.length===0)
            this.setState({alertMessage:'Cannot save empty entry',alertVisible:true,alertColor:'danger'});
        else if(this.state.company==='')
            this.setState({alertMessage:'Comapny name is required',alertVisible:true,alertColor:'danger'});
        else if(this.state.date==='')
            this.setState({alertMessage:'Date is required',alertVisible:true,alertColor:'danger'});
        else if(this.state.billId==='')
            this.setState({alertMessage:'Bill Id is required',alertVisible:true,alertColor:'danger'});
        else{
            this.setState({isLoading:true});
            let uploadData = {
                company:this.state.company,
                date:this.state.date,
                billId:this.state.billId,
                id:this.props.user.userId,
                purchases:this.state.purchases.map(p=>({quantity:p.quantity,prodId:p.prodId}))
            }
            axios.post(config.apiBaseUri+"/user/addPurchase",uploadData,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    alertMessage:"Saved Successfully",
                    alertVisible:true,
                    alertColor:'success',
                    purchases:[],
                    company:'',
                    date:'',
                    billId:'',
                    isLoading:false
                })
            }).catch(e=>{
                if(e.response.status===401)
                    this.props.handleLogout();
                else
                    this.setState({
                        error:e.response.data.message,
                        alertMessage:e.response.data.message,
                        alertVisible:true,
                        isLoading:false
                    });
            });
     
        }
    };

    render()
    {
        return(
            <FluidContainer title="Purchase Entry">
                <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.toggleAlert} style={{position:"fixed",right:'1em',zIndex:999}}>
                    {this.state.alertMessage}
                </Alert>
                <small>This form is to enter the details of purchase made from companies to the inventory</small>
                <CardWithTitle title="Enter Details of The Purchase">
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="company"><strong>From</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Company Name" 
                                        name="company"
                                        onChange={this.handleChange}
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
                                        placeholder="A101" 
                                        onChange={this.handleChange}
                                        value={this.state.billId}
                                        name="billId"/>
                                        </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="date"><strong>Date</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="date" 
                                        onChange={this.handleChange} 
                                        value={this.state.date} 
                                        placeholder="Bill Date" 
                                        name="date"/>
                                    </div>
                            </div>
                        </div>
                    </form>
                </CardWithTitle>
                <CardWithTitle title="Enter Products" >
                    <form onSubmit={this.handleAddProduct}>
                        <div className="form-group">
                            <label><strong>Category</strong></label>
                            <Select value={this.state.selectedCategory} isClearable="true" isSearchable="true" isLoading={this.state.isLoadingCat}  options={this.state.categories} onChange={this.handleSelectCategory}/>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label ><strong>Product</strong></label>
                                    <Select isClearable="true" value={this.state.selectedProduct} isLoading={this.state.isLoadingProd} isSearchable="true" options={this.state.products} onChange={this.handleSelectProduct}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="quantity"><strong>Quantity</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        min="1" 
                                        placeholder="Quantity of product" 
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        name="quantity"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm" type="submit">Add&nbsp;Product</button>
                        </div>
                    </form>
                </CardWithTitle>
                <CardWithTitle title="Products" isLoading={this.state.isLoading}>
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
                    <div className="form-group"><button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Save Entry</button></div>
                </CardWithTitle>
            </FluidContainer>
       
        );
    }
}

export default PurchaseEntry;