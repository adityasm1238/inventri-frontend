import React from 'react';
import axios from 'axios';
import { getAuthHeader } from "../../utils/LocalStorage";
import Select from 'react-select';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import config from '../../config/config';

class AddProduct extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            name:'',
            error:'',
            mrp:0,
            success:'',
            isLoading:false,
            isLoadingCat:true,
            categories:[],
            selectedCategory:null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

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
            this.setState({selectedCategory:value.value});
    };

    handleSubmit = async event =>{
        event.preventDefault();
        console.log(this.state);
        if(this.state.selectedCategory===null)
        {
            this.setState({error:"Catagory is required! If required category is not present then create new"});
        }
        else if(this.state.mrp==="0")
        {
            this.setState({error:"Mrp cannot be 0"});
        }
        else
        {
            this.setState({
                isLoading:true,
                error:'',
                success:''
            });
            const product = {
                id:this.props.user.userId,
                name: this.state.name,
                mrp:this.state.mrp,
                cat_id:this.state.selectedCategory
            };
        
    
            await axios.post(config.apiBaseUri+"/user/addProd",product,getAuthHeader(this.props.user.token)).then(res => {
                    this.setState({
                        success:res.data.message,
                        isLoading:false
                    });
                }).catch(e=>{
                    if(e.response.status===401)
                    {
                        this.props.handleLogout();
                    }
                    this.setState({
                        error:e.response.data.message,
                        isLoading:false
                    });
                });
        }
        
    }

    render()
    {
        return(
            <FluidContainer title="Add new product">
                <small>This form is to add a new product to the inventory</small>
                <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="name"><strong>Name</strong></label>
                                                        <input 
                                                            className="form-control" 
                                                            type="text" 
                                                            placeholder="Product Name" 
                                                            required
                                                            value = {this.state.name}
                                                            onChange = {this.handleChange}
                                                            name="name"/>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="name"><strong>Mrp</strong></label>
                                                        <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="basic-addon1">Rs.</span>
                                                        </div>
                                                        <input 
                                                            className="form-control" 
                                                            type="number" 
                                                            placeholder="Product Name" 
                                                            required
                                                            value = {this.state.mrp}
                                                            min="0"
                                                            onChange = {this.handleChange}
                                                            name="mrp"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address"><strong>Category</strong></label>
                                                <Select  isClearable="true" isSearchable="true" isLoading={this.state.isLoadingCat}  options={this.state.categories} onChange={this.handleSelectCategory}/>
                                            </div>
                                            <div className="form-group">
                                                <button 
                                                    className="btn btn-primary btn-sm" 
                                                    type="submit">
                                                        Save&nbsp;Product
                                                    </button>
                                               
                                            </div>
                                            <div className={"spinner-border text-primary mx-3 d-"+(this.state.isLoading)?"block":"none"} role="status">
                                                    <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="text-danger" >{(this.state.error)?(this.state.error):('')}</div>
                                            <div className="text-success">{(this.state.success)?(this.state.success):('')}</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            </FluidContainer>
       
        );
    }
}

export default AddProduct;