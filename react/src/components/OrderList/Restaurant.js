import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import '../css/orderRestaurant.css'

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectError: false,
            orders: [],
            notGetList: true,
        };
    }

    // get order list from server
    getOrderList = async () => {
        axios.defaults.withCredentials = true
        const data = { restname: Cookies.get("username") };
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_restaurant`
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
    // prevent empty name
    findCourierName = (value) => {
        if (value)
            return value.name
        else return "Not Matched"
    }
    // calculate total price
    calculateTotal = (list) => {
        let i = 0;
        let sum = 0;
        while (list[i]) {
            sum = sum + list[i].price * list[i].amount
            i++;
        }
        return sum;
    }

    onClickStartPreparing = (id) => {
        this.startPreparing(id);
    }
    // update order status to start preparing
    startPreparing = async (id) => {
        axios.defaults.withCredentials = true
        const data = { _id: id, orderStatus: 2 };
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/update_order`
        axios.post(getOrderListUrl, data).then(result => {
            if (result.data.process == "failed") {
                this.setState({ redirectError: true })
            } else {
                this.setState({ notGetList: true })
            }
            return result;
        })
    }
    // restaurant order list layout
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
                <h1 style={{ textAlign: 'center' }}>Order History</h1>
                <Scrollbars style={{ height: 800 }}>
                    {this.state.orders.map((order, index) =>
                        <Paper variant="outlined" elevation={3} style={{ marginBottom: '1rem' }} key={index}>
                            <Grid container className="orderHistory">
                                <Grid container item className="name" spacing={3} style={{ marginBottom: '5px' }}>
                                    <Grid item xs={2}>Customer:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].name}</Grid>
                                    <Grid item xs={2}>Mobile:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].mobile}</Grid>
                                </Grid>
                                {this.findCourierName(order.findNameUnderCouriername[0]) != 'Not Matched' &&
                                    <Grid container item className="name" spacing={3} style={{ marginBottom: '5px' }}>
                                        <Grid item xs={2}>Courier:</Grid>
                                        <Grid item xs={4} className="rightItem">{order.findNameUnderCouriername[0].name}</Grid>
                                        <Grid item xs={2}>Mobile:</Grid>
                                        <Grid item xs={4} className="rightItem">{order.findNameUnderCouriername[0].mobile}</Grid>
                                    </Grid>
                                }
                                {this.findCourierName(order.findNameUnderCouriername[0]) == 'Not Matched' &&
                                    <Grid container item className="name" spacing={3} style={{ marginBottom: '5px' }}>
                                        <Grid item xs={2}>Courier:</Grid>
                                        <Grid item xs={4} className="rightItem">Not Matched</Grid>
                                    </Grid>
                                }
                                <Grid container item spacing={3}>
                                    <Grid item xs={6} className="subtitle">Order Date:{order.createdAt.substring(0, 10)}</Grid>
                                    <Grid item xs={6} className="subtitle">Status: <span style={{ color: '#F08080' }}>{this.getStatus(order.orderStatus)}</span></Grid>
                                </Grid>
                                <Grid container item>
                                    <Grid item xs={3} item className="subtitle">Order Details:</Grid>
                                </Grid>
                                <Grid container item direction="row" key={index} spacing={3}>
                                    <Grid item xs={6} className="subtitle">Dish</Grid>
                                    <Grid item xs={3} className="subtitle">Amount</Grid>
                                    <Grid item xs={3} item className="priceItem subtitle">Price</Grid>
                                </Grid>
                                {order.orderList.map((item, index) =>
                                    <Grid container item direction="row" key={index} spacing={3}>
                                        <Grid item xs={6} className="foodItem">{item.dish}</Grid>
                                        <Grid item xs={3} className="foodItem">{item.amount}</Grid>
                                        <Grid item xs={3} item className="priceItem">${item.price}</Grid>
                                    </Grid>
                                )}
                                <Grid container item justify="flex-end">
                                    <Grid item xs={3} item className="priceItem">Delievery Fee: $20</Grid>
                                </Grid>
                                <Grid container item justify="flex-end">
                                    <Grid item xs={3} item className="priceItem">Total: ${this.calculateTotal(order.orderList) + 20}</Grid>
                                </Grid>
                                {order.orderStatus == 1
                                    &&
                                    <Grid container item justify="center">
                                        <Button title={order.id} id={order.id} size="large" variant="outlined" color="secondary" onClick={() => this.onClickStartPreparing(order.id)}>Start Preparing</Button>
                                    </Grid>
                                }
                            </Grid>
                        </Paper>
                    )}
                </Scrollbars>
            </React.Fragment>
        );
    }
}

export default Restaurant;
