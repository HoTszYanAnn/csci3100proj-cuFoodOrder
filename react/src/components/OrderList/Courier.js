import React from 'react';
import Cookies from 'js-cookie';
import axios from'axios';
import { Link as RouterLink, Redirect } from 'react-router-dom';

class Courier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectError: false,
            orderList: "",
        };
    }
    
    
    getOrderList = async () => {
        axios.defaults.withCredentials = true
        const data = { _id : Cookies.get("token")};
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/orderHistory_courier` 
        axios.post(getOrderListUrl, data).then(result => {
            console.log(result.data);
            if (result.data.process == "failed"){
                this.setState({redirectError : true})
            }else{
                this.setState({orderList : result.data.orderHistory})
            }
            return result;
        })
    }
    render() {
        const username = Cookies.get("username");
        this.getOrderList();

        if (this.state.redirectError){
            return (
                <Redirect to="/error"/>
            );
        }
        return (
            <React.Fragment>
                {this.state.orderHistory}
            </React.Fragment>
        );
    }
}

export default Courier;
