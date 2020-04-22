import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import './matchorder.css'


class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            orders: [],
            notGetList: true,
        };
    }

    getOrderList = async () => {
        axios.defaults.withCredentials = true
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/empty_courier`
        axios.post(getOrderListUrl).then(result => {
            console.log(result.data);
            if (result.data.process == "failed") {
                this.setState({ redirectError: true })
            } else {
                this.setState({ orders: result.data.doc })
            }
            return result;
        })
    }

    calculateTotal = (list) =>{
        let i = 0;
        let sum = 0;
        while (list[i]){
            sum = sum + list[i].price * list[i].amount
            i++;
        } 
        return sum;
    }
    onClickChangeStatus = (id) =>{
        this.changeStatus(id);
    }

    changeStatus = async(id) =>{
        axios.defaults.withCredentials = true
        const data = { _id: id, courier_name: Cookies.get("username")};
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
    render() {
        const accessRight = Cookies.get("accessRight");
        if (this.state.notGetList) {
            this.getOrderList();
            this.state.notGetList = false
        }
        if (accessRight != 0) {
            return <Redirect to="/" />
        }

        return (
            <React.Fragment>
                <Paper className="orderContainer">
                    <div className="orderList">
                        <h1 style={{ textAlign: 'center' }}>PaymentPage</h1>

                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default PaymentPage;
