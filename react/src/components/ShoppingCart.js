import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import './css/ShoppingCart.css';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import Cartlist from '../components/cartlist.js';
import { CookiesProvider } from 'react-cookie';
const NavUserMenu=props=> {
  
  var [subtotal,setSubtotal] = useState(0);
  const [deliveryFee,setFee] = useState(20);
  var [total,setTotal] =useState(0);
 
  let cart=sessionStorage.getItem('myCart',)
  cart=JSON.parse(cart);
 
  return (
     
    <React.Fragment>
      <List>
        <ListItem>
          <Grid container justify="center">
            <div className="orderTitle">Your Order</div>
          </Grid>
        </ListItem>
        <ListItem> 
        
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="pricelist">
          <div>Subtotal</div>
        <div>$</div>
        </ListItem>
        <ListItem className="pricelist">
          <div>Delivery Fee</div>
          <div>${deliveryFee}</div>
        </ListItem>
        <ListItem className="pricelist totalprice">
          <div>Total</div>
          <div>${total}</div>
        </ListItem>
      </List>
      <Grid container justify="center">
        <Button variant="contained" color="secondary" size="large" className="paybtn">
          Make Payment
        </Button>
      </Grid>
    </React.Fragment>
  );
}
export default NavUserMenu