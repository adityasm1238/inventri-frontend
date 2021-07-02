import React from "react";
import { withRouter } from "react-router";
import Footer from "../../components/footer/Footer";

class _404Main extends React.Component{
    render(){
        return(
            <div id="page-top">
                <div class="d-flex flex-column" id="content-wrapper">
                    <div class="container-fluid">
                        <div class="text-center mt-5">
                            <div class="error mx-auto" data-text="404">
                                <p class="m-0">404</p>
                            </div>
                            <p class="text-dark mb-5 lead">Page Not Found</p>
                            <p class="text-black-50 mb-0">It looks like you found a glitch in the matrix...</p><a href="/">← Back to Home</a></div>
                    </div>
                </div>
                <Footer/>
            
            </div>
        );
    }
}

export default withRouter(_404Main);