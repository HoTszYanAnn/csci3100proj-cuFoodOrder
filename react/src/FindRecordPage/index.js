import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid, Button, Paper, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Scrollbars } from 'react-custom-scrollbars';
import './findrecord.css'


class FindRecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            orders: [],
            inputName: "",
            inputAr: "0",
        };
        this.onValueChange = this.onValueChange.bind(this)
    }


//  get order list form server
    getOrderList = async () => {
        axios.defaults.withCredentials = true
        let ar = this.state.inputAr
        let getOrderListUrl = null;
        let data = null;
        if (ar == 0) {
            getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_customer`
            data = { custname: this.state.inputName };
        } else if (ar == 1) {
            getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_restaurant`
            data = { restname: this.state.inputName };
        } else {
            getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_courier`
            data = { couriername: this.state.inputName };
        }
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

    // prevent empty name (not paired)
    findCourierName = (value) => {
        if (value)
            return value.name
        else return "Not Matched"
    }

    onValueChange = prop => event => {
        this.setState({ [prop]: event.target.value })
    }
    
    render() {
        const accessRight = Cookies.get("accessRight");
        if (accessRight != 3) {
            return <Redirect to="/" />
        }

        return (
            <React.Fragment>
                <Paper className="orderContainer">
                    <div className="orderList">
                        <h1 style={{ textAlign: 'center' }}>Find Users Order History</h1>
                        <Grid container spacing={3} style={{ margin: "1rem 0" }}>
                            <Grid item xs={7}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">Username:</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        value={this.state.inputName}
                                        onChange={this.onValueChange('inputName')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl></Grid>
                            <Grid item xs={3}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.inputAr}
                                        onChange={this.onValueChange('inputAr')}
                                    >
                                        <MenuItem value={0}>Customer</MenuItem>
                                        <MenuItem value={1}>Restaurant</MenuItem>
                                        <MenuItem value={2} >Courier</MenuItem>
                                    </Select>
                                </FormControl></Grid>
                            <Grid item xs={2}><Button size="large" variant="outlined" onClick={this.getOrderList}>Search</Button></Grid>
                        </Grid>

                        <Scrollbars style={{ height: 800 }}>
                            <hr />
                            {this.state.orders && this.state.orders.map((order, index) =>
                                <div key={index}>
                                    <Grid container className="orderHistory">
                                        <Grid container item className="name" spacing={3}>
                                            <Grid item xs={2}>Customer:</Grid>
                                            <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].name}</Grid>
                                            <Grid item xs={2}>Mobile:</Grid>
                                            <Grid item xs={4} className="rightItem">{order.findNameUnderCustname[0].mobile}</Grid>
                                        </Grid>
                                        <Grid container item className="name" justify="space-between">
                                            <div>Address:</div>
                                            <div>{order.findNameUnderCustname[0].address}</div>
                                        </Grid>
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
                                            <Grid item xs={6} className="name">Order Date:{order.createdAt.substring(0, 10)}</Grid>
                                            <Grid item xs={6} className="name">Status: {this.getStatus(order.orderStatus)}</Grid>
                                        </Grid>
                                        {order.orderList.map((item, index) =>
                                            <Grid container item direction="row" key={index} spacing={3}>
                                                <Grid item xs={6} className="foodItem">Item Name: {item.dish}</Grid>
                                                <Grid item xs={3} className="foodItem">Amount: {item.amount}</Grid>
                                                <Grid item xs={3} item className="priceItem">${item.price}</Grid>
                                            </Grid>
                                        )}
                                        <Grid container item justify="flex-end">
                                            <Grid item xs={3} item className="name rightItem">Total: ${this.calculateTotal(order.orderList)}</Grid>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                </div>
                            )}
                            {
                                !this.state.orders[0] && <h1 style={{textAlign: 'center', marginTop: '1rem'}}> No Records found</h1>
                            }
                        </Scrollbars>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default FindRecordPage;
