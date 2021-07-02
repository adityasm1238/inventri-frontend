import React from 'react';
import axios from 'axios';
import { getAuthHeader } from "../../utils/LocalStorage";
import Select from 'react-select';
import ReportsFooter from '../../components/reportsfooter/ReportsFooter';
import config from '../../config/config';
import {  getDateString} from "../../utils/Utils";
import { Link } from "react-router-dom";
import CardWithTitle from '../../components/cardwithtitle/CardWithTitle';
import FluidContainer from '../../components/fluidcontainer/FluidContainer';


class Report extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error:'',
            success:'',
            entries:[],
            isLoading:false,
            page:null,
            totalC:0,
            next:0,
            categories:[
                {
                    label:'Sales Entries',
                    value:'sales'
                },
                {
                    label:'Purchase Entries',
                    value:'purchase'
                }
            ],
            selectedCategory:null
        }
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadPrevious = this.loadPrevious.bind(this);
        this.laodPage = this.laodPage.bind(this);
    }

    loadNext = ()=>{
        if(this.state.next>=0)
        {
            this.setState({isLoading:true});
            this.laodPage(this.state.next);
        }
            
    }

    loadPrevious = ()=>{
        if(this.state.page>1)
        {
            this.setState({isLoading:true});
            this.laodPage(this.state.page-2);
        }
            
    }

    handleSelectCategory = (value)=>{
        if(value===null)
        {
            this.setState({selectedCategory:null,page:null,next:0,entries:[]});
        }
        else
            this.setState({selectedCategory:value,page:1,next:0,isLoading:true},this.loadNext);
    };

    laodPage = (pageNo)=>{
        let pathname = "/getSalesEntries";
        if(this.state.selectedCategory.value==="purchase")
            pathname = "/getPurchaseEntries";
        let data = {id:this.props.user.userId,page:pageNo};
        axios.post(config.apiBaseUri+"/user"+pathname,data,getAuthHeader(this.props.user.token)).then(res => {
                this.setState({
                    entries:res.data.entries,
                    next:res.data.next,
                    totalC:res.data.totalC,
                    page:res.data.page,
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
                        alertColor:'danger',
                        isLoading:false
                    });
            });
    }

   
    render()
    {
        return(
            <FluidContainer title="Reports">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-3">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="address"><strong>Category</strong></label>
                                    <Select value={this.state.selectedCategory}  options={this.state.categories} onChange={this.handleSelectCategory}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CardWithTitle title="Entries" isLoading={this.state.isLoading}>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table dataTable my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Company</th>
                                    <th>Date</th> 
                                        {
                                            (this.state.selectedCategory)?(this.state.selectedCategory.value==="purchase")?null:( <th>Total</th> ):null
                                        }      
                                        <th>Details</th>               
                                </tr>
                            </thead>
                                {
                                    (!this.state.isLoading)?
                                    (
                                        <tbody>
                                            { 
                                                this.state.entries.map(product=>
                                                    (  
                                                        <tr key={product._id} className="highlight-on-hover" style={{cursor:"pointer"}}>
                                                            
                                                            {
                                                                (this.state.selectedCategory.value==="sales")? <td>{product._id}</td>:<td>{product.billId}</td>
                                                            }
                                                            <td>{product.company}</td>
                                                            <td>{getDateString(product.date)}</td>
                                                            {
                                                                (this.state.selectedCategory.value==="sales")? <td>Rs.{product.total}</td>:null
                                                            }
                                                            <td><Link className="btn btn-primary btn-sm d-sm-inline-block" role="button" to={((this.state.selectedCategory.value==="sales")?'salesEntry/':'purchaseEntry/')+product._id}>
                                                            &nbsp;View Details
                                                            </Link> </td>
                                                        </tr>     
                                                    )
                                                )
                                            }
                                        </tbody>
                                    ):null
                                }
                            </table>
                        </div>
                        <ReportsFooter total={this.state.totalC} page={this.state.page} next={this.state.next} loadNext={this.loadNext} loadPrevious={this.loadPrevious}/>
                </CardWithTitle>  
            </FluidContainer> 
        );
    }
}

export default Report;