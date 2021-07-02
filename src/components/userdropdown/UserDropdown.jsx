import React from "react";
import { Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from "reactstrap";
class UserDropdown extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            dropdownOpen:false,
        };
    }
    toggle = () => this.setState({dropdownOpen:!this.state.dropdownOpen});
    render(){
        return(
            <Dropdown className="nav-item no-arrow" role="presentation" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle tag="a" className="nav-link" data-toggle="dropdown" aria-expanded={this.state.dropdownOpen} ><span className="d-lg-inline mr-2 text-gray-600 small">{this.props.name}</span></DropdownToggle>
                    <DropdownMenu className="shadow" role="menu">
                        {/* <DropdownItem tag="a" role="presentation" href="#"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Profile</DropdownItem>
                        <DropdownItem tag="a" role="presentation" href="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Settings</DropdownItem>
                        <DropdownItem tag="a" role="presentation" href="#"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Activity log</DropdownItem>
                        <div className="dropdown-divider"></div> */}
                        <DropdownItem tag="a" role="presentation" onClick={this.props.handleLogout}><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout</DropdownItem>
                    </DropdownMenu>

            </Dropdown>
        );
    }
}

export default UserDropdown;