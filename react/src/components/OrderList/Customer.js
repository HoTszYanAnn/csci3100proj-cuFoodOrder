import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
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

    findCourierName = (value) => {
        if (value)
            return value.name
        else return "Not Matched"
    }

    calculateTotal = (list) => {
        let i = 0;
        let sum = 0;
        while (list[i]) {
            sum = sum + list[i].price * list[i].amount
            i++;
        }
        return sum;
    }
    onClickDelete = async(id) =>{
        axios.defaults.withCredentials = true
        var data={  _id : id }
        let deleteUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/delete_order`;
        axios.post(deleteUrl, data).then(res => {
            console.log(res);
            this.getOrderList();
        }).catch((e) => {
            console.log(e);
        });
    }

    onClickStartPayment =(id)=>{

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
                <h1 style={{ textAlign: 'center' }}>Order History</h1>
                <Scrollbars style={{ height: 800 }}>
                    <hr />
                    {this.state.orders.map((order, index) =>
                        <div key={index}>
                            <Grid container className="orderHistory">
                                <Grid container item className="name" spacing={3}>
                                    <Grid item xs={2}>Restaurant:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderRestname[0].name}</Grid>
                                    <Grid item xs={2}>Mobile:</Grid>
                                    <Grid item xs={4} className="rightItem">{order.findNameUnderRestname[0].mobile}</Grid>
                                </Grid>
                                <Grid container item className="name" justify="space-between">
                                    <div>Address:</div>
                                    <div>{order.findNameUnderRestname[0].address}</div>
                                </Grid>
                                {this.findCourierName(order.findNameUnderCouriername[0]) != 'Not Matched' &&
                                    <Grid container item className="name" spacing={3}>
                                        <Grid item xs={2}>Courier:</Grid>
                                        <Grid item xs={4} className="rightItem">{order.findNameUnderCouriername[0].name}</Grid>
                                        <Grid item xs={2}>Mobile:</Grid>
                                        <Grid item xs={4} className="rightItem">{order.findNameUnderCouriername[0].mobile}</Grid>
                                    </Grid>
                                }
                                {this.findCourierName(order.findNameUnderCouriername[0]) == 'Not Matched' &&
                                    <Grid container item className="name" spacing={3}>
                                        <Grid item xs={2}>Courier:</Grid>
                                        <Grid item xs={4} className="rightItem">Not Matched</Grid>
                                    </Grid>
                                }
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
                                <Grid container item justify="flex-end">
                                    <Grid item xs={3} item className="priceItem">Total: ${this.calculateTotal(order.orderList)}</Grid>
                                </Grid>

                                {order.orderStatus == 0
                                    &&
                                    <Grid container item justify="center">
                                        <Button title={order.id} id={order.id} size="large" variant="outlined" color="primary" style={{marginRight: '1rem'}} onClick={() => this.onClickStartPayment(order.id)}>Make Payment</Button>
                                        <Button title={order.id} id={order.id} size="large" variant="outlined" color="secondary" onClick={() => this.onClickDelete(order.id)}>Delete Order</Button>
                                    </Grid>
                                }
                            </Grid>
                            <hr />
                        </div>
                    )}
                </Scrollbars>
            </React.Fragment>
        );
    }
}

export default Customer;
