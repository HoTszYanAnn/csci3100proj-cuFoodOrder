

import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
function ListItems(props){
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 400,
    },
    
    
  }));
  const classes = useStyles();
      let carts=props.cart;
      var cartitem=null;
        if(carts==null){cartitem=null}else{
          cartitem = carts.map(item =>
        {
          return <div className={classes.root} key={item.id}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs>
               <TextField value={item.name} disabled></TextField>
               <TextField value={"$ "+item.price} disabled></TextField>
              </Grid>
              <Grid item xs={2} sm container>
                
                
                <IconButton  color="primary"onClick={() =>props.minOne(item.id)}><IndeterminateCheckBoxIcon/></IconButton>
                <FormControl className={classes.margin}>
                  <InputLabel >Quantity:</InputLabel>
                  <Input name='text'
                  value={item.quantity}
                   disabled
                 />
                 </FormControl>
                <IconButton  color="primary" onClick={() =>props.plusOne(item.id)}><AddBoxIcon/></IconButton>
                <Grid item xs={3} sm >
                <IconButton className="delete" onClick={() =>  
                props.onDelete(item.id)}><DeleteIcon/></IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        
      })}
        return <div>
        
        {cartitem}
        
    
    </div>;
    
  
}
  export default ListItems;
  