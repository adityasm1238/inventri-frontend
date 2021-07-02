import React from 'react';
import axios from 'axios';
import { getAuthHeader } from "../../utils/LocalStorage";
import Select from 'react-select';
import config from '../../config/config';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';


class Inventory extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error:'',
            success:'',
            products:[],
            isLoadingCat:true,
            isLoadingProd:false,
            categories:[],
            selectedCategory:null
        }
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    loadProducts = (cat_id)=>{
        let data = {id:this.props.user.userId,cat_id:cat_id};
        axios.post(config.apiBaseUri+"/user/getProducts",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({products:res.data.map(category=>({label:category.name,value:category._id,quantity:category.quantity,mrp:category.mrp})),isLoadingProd:false});
                console.log(this.state.products);
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


    componentDidMount(){
        let data = {id:this.props.user.userId};
        axios.post(config.apiBaseUri+"/user/getCategories",data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({categories:res.data.map(category=>({label:category.name,value:category._id})),isLoadingCat:false});
            }).catch(e=>{
                if(e.response.status===401)
                {
                    this.props.handleLogout();
                }
                this.setState({
                    error:e.response.data.message,
                    isLoadingCat:false
                });
            });
    }

    handleSelectCategory = (value)=>{
        if(value===null)
        {
            this.setState({selectedCategory:null,products:[]});
        }
        else
            this.setState({selectedCategory:value},()=>{this.loadProducts(this.state.selectedCategory.value)});
    };

   
    render()
    {
        return(
            <FluidContainer title="Inventory">
                <div className="card shadow mb-3">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="address"><strong>Category</strong></label>
                            <Select  isClearable="true" value={this.state.selectedCategory} isSearchable="true" isLoading={this.state.isLoadingCat}  options={this.state.categories} onChange={this.handleSelectCategory}/>
                        </div>
                    </div>
                </div>   
                <CardWithTitle title="Products">
                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table dataTable my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity Available</th> 
                                    <th>MRP</th> 
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    this.state.products.map(product=>
                                        (
                                        <tr key={product.value}>
                                            <td>{product.label}</td>
                                            <td>{product.quantity}</td>
                                            <td>Rs.{product.mrp}</td>
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

export default Inventory;