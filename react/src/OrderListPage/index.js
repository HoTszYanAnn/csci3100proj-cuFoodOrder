import React from 'react';
import Cookies from 'js-cookie';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Customer from "../components/OrderList/Customer";
import Restaurant from "../components/OrderList/Restaurant";
import Courier from "../components/OrderList/Courier";

import { Link as RouterLink, Redirect } from 'react-router-dom';
import './order.css'

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        const username = Cookies.get("username");
        const accessRight = Cookies.get("accessRight");

        if (!accessRight) {
            return <Redirect to="/" />
        }
        
        return (
            <React.Fragment>
                <Paper className="orderContainer">
                    <div className="orderList">
                    {accessRight == "0" && // customer -> check order progress/ confirm finish order
                        <Customer/>
                    }
                    {accessRight == "1" && // Restaurant -> chekc order -> mark cooking finish/
                        <Restaurant/>
                    }
                    {accessRight == "2" && // Courier -> accept order && check order details 
                        <Courier/>
                    }
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default OrderPage;
