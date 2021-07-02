import React from "react";
import { Card,CardBody,CardHeader } from "reactstrap";
const CardWithTitle = (props)=>{
    return (
        <Card className="mb-3">
            <CardHeader className="py-3">
                <p className="text-primary m-0 font-weight-bold">{props.title}</p>
            </CardHeader>
            <CardBody>
                {props.children}
            </CardBody>
            {
                props.isLoading?(
                    <div className={"spinner-border text-primary mx-3 align-self-center"} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                ):null
            }
        </Card>
    );
};

export default CardWithTitle;