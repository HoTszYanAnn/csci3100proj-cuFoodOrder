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
            <div class="orderTitle">Your Order</div>
          </Grid>
        </ListItem>
        <ListItem>
          <ListItemText primary="edf" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem class="pricelist">
          <div>Subtotal</div>
          <div>${subtotal}</div>
        </ListItem>
        <ListItem class="pricelist">
          <div>Delivery Fee</div>
          <div>${deliveryFee}</div>
        </ListItem>
        <ListItem class="pricelist totalprice">
          <div>Total</div>
          <div>${total}</div>
        </ListItem>
      </List>
      <Grid container justify="center">
        <Button variant="contained" color="secondary">
          Make Payment
        </Button>
      </Grid>

    </React.Fragment>
  );
}