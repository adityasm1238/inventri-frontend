import React from 'react';
import Select from 'react-select';
import { Alert } from 'reactstrap';
import { getAuthHeader } from "../../utils/LocalStorage";
import axios from 'axios';
import config from '../../config/config';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';

class SalesEntry extends React.Component{

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
            sales:[],
            alertColor:'danger',
            totalSales:0
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
                this.setState({products:res.data.map(category=>({label:category.name,value:category._id,quantity:category.quantity,mrp:category.mrp,remainingQunatity:category.quantity})),isLoadingProd:false});
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
            this.setState({selectedProduct:value},this.findRemainingQunatity);
    };

    handleAddProduct = event=>{
        event.preventDefault();
        if(this.state.selectedCategory===null)
            this.setState({alertVisible:true,alertMessage:"Category is required",alertColor:'danger'});
        else if(this.state.selectedProduct===null)
            this.setState({alertVisible:true,alertMessage:"Product is required",alertColor:'danger'});
        else{
            let idx = this.state.sales.findIndex((product=>product.prodId===this.state.selectedProduct.value));
            if(idx>=0)
            {
                let items = [...this.state.sales];
                let item = {
                    ...items[idx]
                };
                item.quantity = item.quantity + parseInt(this.state.quantity);
                items[idx] = item;
                let  t = 0;
                items.forEach(element => {
                    t+=(element.mrp*element.quantity);
                });
                this.setState({sales:items,selectedProduct:null,quantity:1,totalSales:t});
            }
            else{
                let newProd = {
                    name:this.state.selectedProduct.label,
                    quantity:parseInt(this.state.quantity),
                    prodId: this.state.selectedProduct.value,
                    mrp:this.state.selectedProduct.mrp
                }
                let  t = 0;
                this.state.sales.forEach(element=>{
                    t+=(element.mrp*element.quantity);
                });
                t+= (newProd.mrp*newProd.quantity);

                this.setState({sales:[...this.state.sales,newProd],selectedProduct:null,quantity:1,totalSales:t});
            }
        }
      
    };

    findRemainingQunatity = ()=>{
        let inSales = this.state.sales.find(x=>x.prodId===this.state.selectedProduct.value);
        if(inSales)
        {
            let rm = this.state.selectedProduct.quantity - inSales.quantity;
            this.setState({selectedProduct:{...this.state.selectedProduct,remainingQunatity:rm}});
        }
    };

    handleSubmit = event=>{
        event.preventDefault();
        if(this.state.sales.length===0)
            this.setState({alertMessage:'Cannot save empty entry',alertVisible:true,alertColor:'danger'});
        else if(this.state.company==='')
            this.setState({alertMessage:'Comapny name is required',alertVisible:true,alertColor:'danger'});
        else if(this.state.date==='')
            this.setState({alertMessage:'Date is required',alertVisible:true,alertColor:'danger'});
        else{
            this.setState({isLoading:true});
            let uploadData = {
                company:this.state.company,
                date:this.state.date,
                id:this.props.user.userId,
                total:parseInt(this.state.totalSales),
                sales:this.state.sales.map(p=>({quantity:p.quantity,prodId:p.prodId}))
            }
            axios.post(config.apiBaseUri+"/user/addSales",uploadData,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    alertMessage:"Saved Successfully",
                    alertVisible:true,
                    alertColor:'success',
                    sales:[],
                    company:'',
                    date:'',
                    selectedCategory:null,
                    totalSales:0,
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
            <FluidContainer title="Sales Entry">
                <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.toggleAlert} style={{position:"fixed",right:'1em',zIndex:999}}>
                    {this.state.alertMessage}
                </Alert>
                <small>This form is to enter the details of sales made to companies from the inventory</small>
                <CardWithTitle title="Enter Details of The Purchase">
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="company"><strong>To</strong></label>
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
                <CardWithTitle title= "Enter Products">
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
                                    {
                                        this.state.selectedProduct?(this.state.selectedProduct.remainingQunatity>0)?(<small  class="form-text text-muted">Available quantity {this.state.selectedProduct.remainingQunatity}</small>):(<small  class="form-text text-danger">This product is empty</small>):''
                                    }
                                    
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="quantity"><strong>Quantity</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        disabled={this.state.selectedProduct?(this.state.selectedProduct.remainingQunatity===0)?true:false:false}
                                        min="1"
                                        max={this.state.selectedProduct?this.state.selectedProduct.remainingQunatity:''}
                                        placeholder="Quantity of product" 
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        name="quantity"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className={"btn btn-primary btn-sm "+(this.state.selectedProduct?(this.state.selectedProduct.remainingQunatity===0)?'d-none':'':'')} type="submit">Add&nbsp;Product</button>
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
                    <div className="form-group"><button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Save Entry</button></div>
                </CardWithTitle>
            </FluidContainer>
        );
    }
}

export default SalesEntry;