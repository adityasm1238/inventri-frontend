import React from "react";
import {Row} from "reactstrap";
import BigButton from '../../components/bigbuttons/BigButtons';

const ButtonGroup = ()=>{
        return(
            <Row>
                <BigButton title="Purchase Entry" description="Enter Products that is added to your inventory" to="/user/purchaseEntry" bgColor="primary"/>
                <BigButton title="Sales Entry" description="Generate bills for sales made" to="/user/salesEntry" bgColor="success"/>
                <BigButton title="Report" description="Sales and Purchase reports" to="/user/reports" bgColor="info"/>
                <BigButton title="Invertory" description="Details of Items in inventory" to="/user/inventory" bgColor="warning"/>
            </Row>
        );
}

export default ButtonGroup;