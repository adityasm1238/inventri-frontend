import React from "react";
import { Navbar,Nav } from "reactstrap";
import Alerts from "../alerts/Alerts";
import UserDropdown from "../userdropdown/UserDropdown";
class Topbar extends React.Component{
   
    render(){
        return(
            <Navbar className="navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid">
                    <div className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button" onClick={this.props.handleToggle}>
                        <i className="fas fa-bars"></i>
                    </div>
                    <Nav className="navbar-nav flex-nowrap ml-auto">
                        <Alerts/>     
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <UserDropdown name={this.props.userName} handleLogout={this.props.handleLogout}/>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Topbar;