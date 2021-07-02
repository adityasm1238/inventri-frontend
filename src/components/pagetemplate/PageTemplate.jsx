import React from "react";
import SideBar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import Topbar from "../topbar/Topbar";
class PageTemplate extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            toggled:'toggled',
        };

       

        this.toggleNavBar = this.toggleNavBar.bind(this);
    }

    toggleNavBar = event =>{
        event.preventDefault();
        if(this.state.toggled === '')
            this.setState({toggled:'toggled',});
        else
            this.setState({toggled:''});
    };

    render(){
        return(
            <div id="page-top">
                <div id="wrapper">
                    <SideBar currentPath = {this.props.currentPath} sideBarState={this.state.toggled} handleToggle={this.toggleNavBar} navItems = {this.props.navItems}/>
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Topbar handleToggle={this.toggleNavBar} userName={this.props.user.userName} handleLogout = {this.props.handleLogout}/>
                          
                                {this.props.children}
                        </div>
                        <Footer/>
                    </div>
                    <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
                </div>
            </div>
        );
    }
}

export default PageTemplate;