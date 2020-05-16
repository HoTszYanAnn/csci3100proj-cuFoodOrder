import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import '../css/orderCourier.css'

class Courier extends React.Component {
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
        const data = { couriername: Cookies.get("username") };
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_courier`
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
    findRestaurantName = (value) => {
        if (value)
            return value[0].name
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

    onClickChangeStatus = (id, status) => {
        this.changeStatus(id, status);
    }
    // update order status to server
    changeStatus = async (id, status) => {
        axios.defaults.withCredentials = true
        const data = { _id: id, orderStatus: status };
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
    // courier order list layout
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
                                <Grid container item className="name" spacing={3}>
                                    <Grid item xs={2}>Customer:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].name}</Grid>
                                    <Grid item xs={2}>Mobile:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].mobile}</Grid>
                                </Grid>
                                <Grid container item className="subtitle" justify="space-between" style={{ marginBottom: '5px' }}>
                                    <div>Address:</div>
                                    <div>{order.findNameUnderCustname[0].address}</div>
                                </Grid>
                                <Grid container item className="name" spacing={3}>
                                    <Grid item xs={2}>Restaurant:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderRestname[0].name}</Grid>
                                    <Grid item xs={2}>Mobile:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderRestname[0].mobile}</Grid>
                                </Grid>
                                <Grid container item className="subtitle" justify="space-between" style={{ marginBottom: '10px' }}>
                                    <div>Address:</div>
                                    <div>{order.findNameUnderRestname[0].address}</div>
                                </Grid>
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
                                {order.orderStatus == 2
                                    &&
                                    <Grid container item justify="center">
                                        <Button title={order.id} id={order.id} size="large" variant="outlined" color="secondary" onClick={() => this.onClickChangeStatus(order.id, 3)}>Start Delivery</Button>
                                    </Grid>
                                }
                                {order.orderStatus == 3
                                    &&
                                    <Grid container item justify="center">
                                        <Button title={order.id} id={order.id} size="large" variant="outlined" color="secondary" onClick={() => this.onClickChangeStatus(order.id, 4)}>Delivered</Button>
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

export default Courier;
