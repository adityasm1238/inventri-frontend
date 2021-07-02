import React from "react";
import { Dropdown,NavItem,DropdownToggle,DropdownMenu} from "reactstrap";
class Alerts extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            alertsDropDown:false,
        };

        
    }
    toggleDropDown = () => this.setState({alertsDropDown:!this.state.alertsDropDown});
    render()
    {
        return(
            <NavItem className=" no-arrow mx-1" role="presentation">
                            <Dropdown  direction="down" className="nav-item no-arrow" isOpen={this.state.alertsDropDown} toggle={this.toggleDropDown}>
                                <DropdownToggle className="nav-link" data-toggle="dropdown" tag="a" aria-expanded={this.state.alertsDropDown} ><span className="badge badge-danger badge-counter"></span><i className="fas fa-bell fa-fw"></i></DropdownToggle>
                                    <DropdownMenu className="dropdown-list"
                                        role="menu">
                                        <h6 className="dropdown-header">alerts center</h6>
                                        {/* <a className="d-flex align-items-center dropdown-item" href="#">
                                            <div className="mr-3">
                                                <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white"></i></div>
                                            </div>
                                            <div><span className="small text-gray-500">December 12, 2019</span>
                                                <p>A new monthly report is ready to download!</p>
                                            </div>
                                        </a>
                                        <a className="d-flex align-items-center dropdown-item" href="#">
                                            <div className="mr-3">
                                                <div className="bg-success icon-circle"><i className="fas fa-donate text-white"></i></div>
                                            </div>
                                            <div><span className="small text-gray-500">December 7, 2019</span>
                                                <p>$290.29 has been deposited into your account!</p>
                                            </div>
                                        </a>
                                        <a className="d-flex align-items-center dropdown-item" href="#">
                                            <div className="mr-3">
                                                <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white"></i></div>
                                            </div>
                                            <div><span className="small text-gray-500">December 2, 2019</span>
                                                <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                            </div>
                                        </a> */}
                                        <button className="text-center dropdown-item small text-gray-500" >Show All Alerts</button>
                                        </DropdownMenu>
                            </Dropdown>
                        </NavItem>
        );
    }
}

export default Alerts;