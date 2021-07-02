import {Route, Switch, Redirect} from 'react-router-dom';
import React from "react";
import axios from 'axios';

import './App.css';
import LoginPage from './pages/login/LoginPage.jsx';
import UserPages from './pages/userpages/UserPages';
import _404Main from "./pages/404/404Main";
import RegisterPage from './pages/register/RegisterPage';
import { getAuthHeader,getAuthToken,getUserId } from "./utils/LocalStorage";
import LoadingPage from './components/loading/LoadingPage';
import config from './config/config';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      user:{
        isLoggedIn:false,
        userId:null,
        userName:null,
        token:'',
      },
      isLoading:true
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(userId,userName,token){
    this.setState({
      user:{
        isLoggedIn:true,
        userId:userId,
        userName:userName,
        token:token,
      }
    })
  }

  handleLogout(){
    localStorage.clear();
    this.setState({
      user:{
        isLoggedIn:false,
        userId:null,
        userName:null,
        token:'',
      }
    });
  }

  componentDidMount(){
    let id = getUserId();
    let token = getAuthToken();
    if(id && token){
      
      axios.post(config.apiBaseUri+"/user/getUser",{id},getAuthHeader(token)).then(res => {
                this.setState({
                  user:
                  {
                    isLoggedIn:true,
                    userId:id,
                    userName:res.data.firstname,
                    token:token,
                  },
                  isLoading:false,
                });
              }).catch(e=>{
                  localStorage.clear();
                  this.setState({isLoading:false});
              });
    }
    else
    {
      localStorage.clear();
      this.setState({isLoading:false});
    }
  }

  render(){
    return (
      this.state.isLoading?<LoadingPage/>:
      <Switch>
        <Route exact path="/" render={()=>(this.state.user.isLoggedIn)?(<Redirect to="/user/dashboard"/>):(<Redirect to="/login"/>)} />
        <Route exact path = '/login' render={()=>(<LoginPage user={this.state.user} handleLogin={this.handleLogin}/>)}/>
        <Route exact path="/register" render={()=>(<RegisterPage user={this.state.user} handleLogin={this.handleLogin}/>)}/>
        <Route path="/user"  render={()=>(<UserPages user={this.state.user} handleLogout = {this.handleLogout}/>)}/>
        <Route component={_404Main}/>
      </Switch>
    );
  }
}

export default App;
