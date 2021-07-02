import React from "react";

class LoadingPage extends React.Component{
    render(){
        return(
            <div  className="bg-gradient-primary d-flex" style={{height:"100vh",flexDirection:"column",justifyContent:"center"}}>
                <h3 className="text-white" style={{width:"100%",textAlign:"center",fontWeight:900,fontSize:"3rem"}}>
                    Inventri
                </h3>
            </div>
        );
    }
}

export default LoadingPage;