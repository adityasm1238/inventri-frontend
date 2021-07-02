import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,NavbarBrand,NavItem, Nav } from "reactstrap";
class SideBar extends React.Component{

    render(){
        return(
            <Navbar className={"navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 "+this.props.sideBarState}>
                    <div className="container-fluid d-flex flex-column p-0">
                        <NavbarBrand className=" d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                            <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-shopping-cart"></i></div>
                            <div className="sidebar-brand-text mx-3"><span>Inventri</span></div>
                        </NavbarBrand>
                        <hr className="sidebar-divider my-0" />
                        <Nav className="navbar-nav text-light" id="accordionSidebar">
                            {
                                this.props.navItems.map((navItem,i)=>(
                                    <NavItem key={i} role="presentation"><Link className={"nav-link "+(this.props.currentPath===navItem.path?"active":"")} to={navItem.path}><i className={"fas fa-"+navItem.icon}></i><span>{navItem.name}</span></Link></NavItem>
                                ))
                            }
                            
                        </Nav>
                        <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button" onClick={this.props.handleToggle}></button></div>
                    </div>
            </Navbar>
        );
    }
};

export default SideBar;