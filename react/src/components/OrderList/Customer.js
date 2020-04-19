import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { ScrollArea } from 'react-scrollbar';
import '../css/orderCustomers.css'
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectError: false,
            orders: [],
            notGetList: true,
        };
    }


    getOrderList = async () => {
        axios.defaults.withCredentials = true
        const data = { custname: Cookies.get("username") };
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_customer`
        axios.post(getOrderListUrl, data).then(result => {
            console.log(result.data);
            if (result.data.process == "failed") {
                this.setState({ redirectError: true })
            } else {
                this.setState({ orders: result.data.orderHistory })
            }
            return result;
        })
    }
    
    getStatus = (value) => {
        if (value == 0) {
            return "not paid"
        } else if (value == 1) {
            return "paid"
        } else if (value == 2) {
            return "preparing"
        } else if (value == 3) {
            return "on delivery"
        } else if (value == 4) {
            return "delivered"
        }
    }

    findCourierName = (value) =>{
        if (value)
            return value.name
        else return "Not Matched"
    }

    render() {
        if (this.state.notGetList) {
            this.getOrderList();
            this.state.notGetList = false
        }
        if (this.state.redirectError) {
            return (
                <Redirect to="/error" />
            );
        }
        return (
            <React.Fragment>
                <hr />
                {this.state.orders.map((order, index) =>
                    <div>
                    <Grid key={index} container className="orderHistory">
                        <Grid container item className="name" justify="space-between">
                            <div>Restaurant:</div> 
                            <div>{order.findNameUnderRestname[0].name}</div>
                        </Grid>
                        <Grid container item className="name" justify="space-between">
                            <div>Courier:</div> 
                            <div>{this.findCourierName(order.findNameUnderCouriername[0])}</div>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={6} className="subtitle">Order Date:{order.createdAt.substring(0, 10)}</Grid>
                            <Grid item xs={6} className="subtitle">Status: {this.getStatus(order.orderStatus)}</Grid>
                        </Grid>
                        {order.orderList.map((item, index) =>
                        <Grid container item direction="row" key={index} spacing={3}>
                            <Grid item xs={6} className="foodItem">Item Name: {item.dish}</Grid>
                            <Grid item xs={3} className="foodItem">Amount: {item.amount}</Grid>
                            <Grid item xs={3} item className="priceItem">${item.price}</Grid>
                        </Grid>
                        )}
                    </Grid>
                    <hr />
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Customer;
