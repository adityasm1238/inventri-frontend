import React from "react";
import loginpageImage from "../../images/LoginImage.jpg";
import {Container, Row, Card, CardBody, Col} from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import config from '../../config/config';

class RegisterPage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            password_repeat:'',
            error:''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const user = {...this.state};
        if(user.password.length<8)
            this.setState({error:'Password should minimum of length 8'});
        else if(user.password!==user.password_repeat)
            this.setState({error:'Password does not match'});
        else{
            delete user.error;
            delete user.password_repeat;
            await axios.post(config.apiBaseUri+"/auth/signup",user).then(res => {
                localStorage.setItem("access_token",res.data.access_token);
                localStorage.setItem("id",res.data.user._id);
                this.props.handleLogin(res.data.user._id,res.data.user.firstname,res.data.access_token);
              }).catch(e=>{
                  this.setState({error:"Invalid Username or Password"});
              });
        }
        
    }
    render()
    {
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
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input 
                                                                        className="form-control form-control-user" 
                                                                        type="text" 
                                                                       
                                                                        required
                                                                        placeholder="First Name" 
                                                                        value = {this.state.firstname}
                                                                        onChange = {this.handleChange}
                                                                        name="firstname"/>
                                                                    </div>
                                                                <div className="col-sm-6">
                                                                    <input 
                                                                        className="form-control form-control-user" 
                                                                        type="text" 
                                                                        required
                                                                        value = {this.state.lastname}
                                                                        onChange = {this.handleChange}
                                                                        placeholder="Last Name" 
                                                                        name="lastname"/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input 
                                                                    className="form-control form-control-user" 
                                                                    type="email" 
                                                                    required
                                                                    aria-describedby="emailHelp" 
                                                                    value = {this.state.email}
                                                                    onChange = {this.handleChange}
                                                                    placeholder="Email Address" 
                                                                    name="email"/>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input 
                                                                        className="form-control form-control-user" 
                                                                        type="password" 
                                                                        required
                                                                        value = {this.state.password}
                                                                        onChange = {this.handleChange}
                                                                        placeholder="Password" 
                                                                        name="password"/>
                                                                    </div>
                                                                <div className="col-sm-6">
                                                                    <input 
                                                                        className="form-control form-control-user" 
                                                                        type="password" 
                                                                        required
                                                                        placeholder="Repeat Password"
                                                                        value = {this.state.password_repeat}
                                                                        onChange = {this.handleChange}
                                                                        name="password_repeat"/>
                                                                    </div>
                                                            </div>
                                                            <button className="btn btn-primary btn-block text-white btn-user" type="submit">Register Account</button>
                                                            <div className="text-center" style={{color:'red'}}>{(this.state.error)?(this.state.error):('')}</div>
                                                            <hr/>
                                                        </form>
                                                        <div className="text-center"><a className="small" href="/login">Already have an account? Login!</a></div>
                                                        
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
};
export default RegisterPage;