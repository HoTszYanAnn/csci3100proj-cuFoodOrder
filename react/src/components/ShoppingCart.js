import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withRouter, Redirect } from "react-router";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import Cartlist from '../components/cartlist.js';
import './css/ShoppingCart.css'


class NavUserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      delFee: 20,
      total: 0,
      cart: JSON.parse(sessionStorage.getItem('myCart')),
      reducer: (accumulator, currentValue) => accumulator + currentValue,
      redirectPayment: false,
    }
    this.deleteItem = this.deleteItem.bind(this)
    this.Count = this.Count.bind(this)
    this.plusOne = this.plusOne.bind(this)
    this.decOne = this.decOne.bind(this)
  }


  //var n1=parseInt(subtotal)+parseInt(price);
  deleteItem = id => {// function of delete order in shopping cart
    console.log('delete');
    const filteredItems = this.state.cart.filter(item =>
      item.id != id);
    console.log(id);
    console.log(filteredItems);
    this.setState({
      cart: filteredItems,
    })
    sessionStorage.setItem('myCart', JSON.stringify(filteredItems));
    this.Count();
  }
  componentDidMount() {
    this.Count();
  }
  Count = props => {// count the total of the order
    let cart = JSON.parse(sessionStorage.getItem('myCart'))
    if (cart == null) {
      this.setState({
        subtotal: 0,
        delFee: 20,
        total: 0,
      })
    } else {
      var count = 0;
      for (var i = 0; i < cart.length; i++) {
        var count = count + parseInt(cart[i].price) * (cart[i].amount);
      }

      var countTo = parseInt(count) + parseInt(this.state.delFee);
      this.setState({
        subtotal: count,
        total: countTo,
      })
    }
  }
  plusOne = id => {// function of quantity plus one
    let cart = this.state.cart;
    cart.map(item => {
      if (item.id === id) {
        var n = parseInt(item.amount) + 1;
        item.amount = n;
      }
    })
    this.setState({
      cart: cart
    })
    sessionStorage.setItem('myCart', JSON.stringify(this.state.cart));
    this.Count();
  }
  decOne = id => {// function of quantity minus one
    let cart = this.state.cart;
    cart.map(item => {
      if (item.id === id) {
        var n;
        if (item.amount == 1) {
          n = 1;
        } else {
          n = parseInt(item.amount) - 1;
          item.amount = n;
        }
      }

    })
    this.setState({
      cart: cart
    });
    sessionStorage.setItem('myCart', JSON.stringify(this.state.cart));
    this.Count();
  }

  createOrder = async () => {// pass the order request to datatbase
    axios.defaults.withCredentials = true
    let cart = JSON.parse(sessionStorage.getItem('myCart'))
    var order = { customer_name: Cookies.get("username"), restaurant_name: this.props.history.location.pathname.split("/")[2], orderList: cart, orderStatus: 0 }
    let createUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/createBill`;
    axios.post(createUrl, order).then(res => {
      console.log(res.data)
      this.setState({ redirectPayment: res.data.orderData.id })
      let item = []
      sessionStorage.setItem('myCart', JSON.stringify(item));
      this.props.closebtnClick();
    }).catch((e) => {
      console.log(e);
    });
  }


  render() {
    if (this.state.redirectPayment) {// function of payment
      return (
        <Redirect to={{ pathname: `/payment/${this.state.redirectPayment}` }} />
      )
    }
    let empty = false;
    if (JSON.parse(sessionStorage.getItem('myCart')) == null){
      let item = []
      sessionStorage.setItem('myCart', JSON.stringify(item));
    }
    if (JSON.parse(sessionStorage.getItem('myCart')).length == 0)
      empty = true;
    return (// layout of the shopping cart
      <React.Fragment>
        <List>
          <ListItem>
            <Grid container justify="center">
              <h1>Your Order</h1>
            </Grid>
          </ListItem>
          <ListItem>
            <Cartlist
              cart={this.state.cart}
              onDelete={this.deleteItem}
              plusOne={this.plusOne}
              minOne={this.decOne}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className="pricelist">
            <div>Subtotal</div>
            <div>
              $ {this.state.subtotal}
            </div>
          </ListItem>
          <ListItem className="pricelist">
            <div>Delivery Fee</div>
            <div>$ {this.state.delFee}</div>
          </ListItem>
          <ListItem className="pricelist totalprice">
            <div>Total</div>
            <div>$ {this.state.total}</div>
          </ListItem>
        </List>

        <Grid container justify="center">
          {/*<Grid item xs sm>
            <Button variant="contained" color="secondary" size="large" className="paybtn" onClick={this.Count} >Get Total</Button>
          </Grid>*/}
          <Grid item xs sm container justify="center">
            <Button variant="contained" color="secondary" size="large" className="paybtn" disabled={empty} onClick={this.createOrder}>
              Make Payment
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withRouter(NavUserMenu)