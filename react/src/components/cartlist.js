

import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
function ListItems(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: '1rem'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 400,
    },
  }));
  const classes = useStyles();
  let carts = props.cart;
  var cartitem = null;
  console.log(carts)
  if (carts == null) { cartitem = null } else {//layout of items in the shopping cart
    cartitem = carts.map(item => {
      return <div className={classes.root} key={item.id}>
        <Card className={classes.paper}>
          <Grid container spacing={3} direction="column">
            <Grid item container>
              <Grid item xs={9}>
                <TextField value={item.dish} disabled></TextField>
                <TextField value={"$ " + item.price} disabled></TextField>
              </Grid>
              <Grid item xs={3} sm style={{margin: 'auto'}}>
                <IconButton className="delete" onClick={() => props.onDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={2} sm container>
              <Grid item xs={3}>
                <IconButton color="primary" onClick={() => props.minOne(item.id)}><IndeterminateCheckBoxIcon /></IconButton>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.margin}>
                  <InputLabel >Quantity:</InputLabel>
                  <Input name='text'
                    value={item.amount}
                    disabled
                    inputProps={{ style: {textAlign: 'center'} }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <IconButton color="primary" onClick={() => props.plusOne(item.id)}><AddBoxIcon /></IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>

    })
  }
  return <div>

    {cartitem}


  </div>;


}
export default ListItems;
