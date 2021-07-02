import React from 'react';
import axios from 'axios';
import { getAuthHeader } from "../../utils/LocalStorage";
import FluidContainer from '../../components/fluidcontainer/FluidContainer';
import config from '../../config/config';

class AddCategory extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            name:'',
            error:'',
            success:'',
            isLoading:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }
    handleSubmit = async event =>{
        event.preventDefault();
        this.setState({
            isLoading:true,
            error:'',
            success:''
        });
        const cat = {...this.state,
            id:this.props.user.userId};
        delete cat.error;
        await axios.post(config.apiBaseUri+"/user/addCat",cat,getAuthHeader(this.props.user.token)).then(res => {
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

    render()
    {
        return(
            <FluidContainer title="Add new category"> 
                <small>This form is to add a new category to the inventory</small>
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
                                                            placeholder="Category Name" 
                                                            required
                                                            onChange = {this.handleChange}
                                                            name="name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button 
                                                    className="btn btn-primary btn-sm" 
                                                    type="submit">
                                                        Save&nbsp;Category
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

export default AddCategory;