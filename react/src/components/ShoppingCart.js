import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import './css/ShoppingCart.css';
import Button from '@material-ui/core/Button';

export default function NavUserMenu() {
  const subtotal = 100;
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <React.Fragment>
      <List>
        <ListItem>
          <Grid container justify="center">
            <div className="orderTitle">Your Order</div>
          </Grid>
        </ListItem>
        <ListItem>
          <ListItemText primary="edf" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="pricelist">
          <div>Subtotal</div>
          <div>${subtotal}</div>
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