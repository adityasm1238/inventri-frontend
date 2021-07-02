import React from "react";
import { Container } from "reactstrap";
class Footer extends React.Component{
    render(){
        return(
            <footer className="bg-white sticky-footer">
                <Container>
                    <div className="text-center my-auto copyright"><span>Copyright © Inventri 2021</span></div>
                </Container>
            </footer>
        );
    }
}

export default Footer;