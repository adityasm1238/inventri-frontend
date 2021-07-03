import React from "react";
import { Redirect,Link} from 'react-router-dom';
import loginpageImage from "../../images/LoginImage.jpg";
import {Container, Row, Card, CardBody, Col} from "reactstrap";
import axios from 'axios';
import config from '../../config/config';

class LoginPage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
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
            isLoading:true
        });
        const user = {...this.state};
        if(user.password.length<8)
            this.setState({error:'Password should minimum of length 8'});
        else{
            delete user.error;
            await axios.post(config.apiBaseUri+"/auth/signin",user).then(res => {
                this.setState({
                    isLoading:false
                });
                localStorage.setItem("access_token",res.data.access_token);
                localStorage.setItem("id",res.data.user._id);
                this.props.handleLogin(res.data.user._id,res.data.user.firstname,res.data.access_token);
              }).catch(e=>{
                  this.setState({error:"Invalid Username or Password",isLoading:false});
              });
        }
        
    }
    render(){
        return(
            (
                this.props.user.isLoggedIn?(<Redirect to='/user/dashboard'/>):
            (
                    <div className="bg-gradient-primary" style={{minHeight:100+"vh",height:100+"%"}}>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md="9" lg="9" xl="10">
                                    <Card className="shadow-lg o-hidden border-0 my-5">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col lg="6" className="d-none d-lg-flex">
                                                    <div className="flex-grow-1 bg-login-image" style={{backgroundImage:"url("+loginpageImage+")"}}></div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="p-5">
                                                        <div className="text-center">
                                                            <h4 className="text-dark mb-4">Welcome Back!</h4>
                                                        </div>
                                                        <form className="user" onSubmit={this.handleSubmit}>
                                                            <div className="form-group">
                                                                <input 
                                                                    className="form-control form-control-user" 
                                                                    type="email" 
                                                                    value = {this.state.email}
                                                                    onChange = {this.handleChange}
                                                                    aria-describedby="emailHelp" 
                                                                    placeholder="Enter Email Address..." 
                                                                    name="email" />
                                                                </div>
                                                            <div className="form-group">
                                                                <input 
                                                                className="form-control form-control-user" 
                                                                type="password"
                                                                placeholder="Password" 
                                                                value= {this.state.password}
                                                                onChange = {this.handleChange}
                                                                name="password" />
                                                            </div>
                                                            <button className="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                                                            <div className="text-center" style={{color:'red'}}>{(this.state.error)?(this.state.error):('')}</div>
                                                            <hr/>
                                                            <div className="d-flex justify-content-center">
                                                            {
                                                                this.state.isLoading?(
                                                                    <div className={"spinner-border text-primary mx-3 align-self-center"} role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                ):null
                                                            }
                                                            </div>
                                                          
                                                        </form>
                                                      
                                                        <div className="text-center"><Link className="small" to="/register">Create an Account!</Link></div>
                                                    </div>
                                                   
                                                </Col>
                                                
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
            )
            )
        );
    }
}

export default LoginPage;