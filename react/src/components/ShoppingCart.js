import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Cartlist from '../components/cartlist.js';



    class NavUserMenu extends React.Component {
        constructor(props){
          super(props);
          this.state = {
            subtotal:0,
            delFee:20,
            total:0,
            cart:JSON.parse(sessionStorage.getItem('myCart',)),
            reducer : (accumulator, currentValue) => accumulator + currentValue,
          }
          this.deleteItem=this.deleteItem.bind(this)
          this.Count=this.Count.bind(this)
          this.plusOne=this.plusOne.bind(this)
          this.decOne=this.decOne.bind(this)
        }
 
  
  //var n1=parseInt(subtotal)+parseInt(price);
   deleteItem=id=>{
    console.log('delete');
    const filteredItems= this.state.cart.filter(item =>
      item.id!=id);
      console.log(id);
      console.log(filteredItems);
      this.setState({
        cart:filteredItems,
      })
  }
  Count=props=>{
    if(this.state.cart==null){
      this.setState({
        subtotal:0,
        delFee:20,
        total:0,
      })
    }else{
      var count=0;
      
      
      for(var i=0;i<this.state.cart.length;i++){
        var count=count+parseInt(this.state.cart[i].price)*(this.state.cart[i].quantity);
      }
      
      var countTo=parseInt(count) +parseInt(this.state.delFee) ;
      this.setState({
        subtotal:count,
        total:countTo,
      })
    }
  }
   plusOne=id=>{
     let cart=this.state.cart;
      cart.map(item=>{      
      if(item.id===id){
        var n=parseInt(item.quantity)+1;
        item.quantity= n;
      }
    })
    this.setState({
      cart:cart
    })
  
  }
 decOne=id=>{
   let cart=this.state.cart;
    cart.map(item=>{      
    if(item.id===id){
      var n=parseInt(item.quantity)+1;
      item.quantity= n;
    }
  })
  this.setState({
    cart:cart
  });
}
render(){
  
  return (
     
    <React.Fragment>
      <List>
        <ListItem>
          <Grid container justify="center">
            <div className="orderTitle">Your Order</div>
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
          <Grid item xs sm>
        <Button variant="contained" color="secondary" size="large" className="paybtn" onClick={this.Count} >Get Total</Button>
        </Grid>
        <Grid item xs sm>
          <Button variant="contained" color="secondary" size="large" className="paybtn" onClick={this.props.closebtnClick}>
            Make Payment
          </Button>
          </Grid>
        </Grid>
    </React.Fragment>
  );
}
}
export default NavUserMenu