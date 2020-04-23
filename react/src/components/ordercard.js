
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Cookies from 'js-cookie'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  image: {
    margin: 'auto',
    width: 300,
    height: 200,
    maxWidth: '100%',
    maxHeight: '100%',
  },

  typography: {
    fontfamily: ['Roboto'],
    fontSize: ['30px'],
    color: ['red'],
  },
  b: {
    fontSize: ['20px']
  },
  CardHeader: {
    color: '#626769'
  },
  margin: {
    margin: theme.spacing(1),
  }
}));
const Order = props => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //var [cartid,setCartid]=useState();
  var [value, setvalue] = useState(1);
  var [disstate, setDisable] = useState(false);


  const addToCart = () => {
    let cart = sessionStorage.getItem('myCart')
    cart = JSON.parse(cart);
    //let obj={id:cart.id, name:cart.name, price: cart.price}
    let newobj = [{ id: props.id, dish: props.name, price: props.price, amount: value }]

    let obj = [...cart, ...newobj];
    console.log(obj);
    sessionStorage.setItem('myCart', JSON.stringify(obj));
    setDisable(true);
  }

  const plusOne = () => {
    var n = parseInt(value) + 1;
    setvalue(n);
  }

  const decOne = () => {
    if (value == 1) {
      setvalue(1);
    } else {
      var n = parseInt(value) - 1;
      setvalue(n);
    }
  }
  const colorList=['#D2FFBC', '#BDEAFF','#FFFFBD', '#DCBDFF', '#FFEABD']
  return (

    <Card className={classes.root}>
      <CardHeader
        className={classes.CardHeader}
        titleTypographyProps={{ variant: "h6" }}
        title={props.name}
        style={{backgroundColor: colorList[Math.floor(Math.random() * 5)]}}
        subheader={props.description}
      />
      <CardMedia
        className={classes.image}
        image={props.img}
        title={props.name}
        justify="center"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
          <b className={classes.b}>HK$</b> <b>{props.price}</b>
        </Typography>

        <Grid container justify="center">
          <IconButton color="primary" onClick={decOne} disabled={disstate || props.disableBtn || (Cookies.get('accessRight') == 0 ? false:true)}><IndeterminateCheckBoxIcon /></IconButton>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={value}
              disabled
              style={{width: '2rem', textAlign: 'center'}}
              inputProps={{ style: {textAlign: 'center'} }}
            />
          </FormControl>
          <IconButton color="primary" onClick={plusOne} disabled={disstate || props.disableBtn || (Cookies.get('accessRight') == 0? false:true)}><AddBoxIcon /></IconButton>
        </Grid>
        <Grid container justify="center">
        <Button variant="contained" color="secondary" size="large" onClick={addToCart} disabled={disstate || props.disableBtn || (Cookies.get('accessRight') == 0? false:true)}>Add to Cart</Button>
        </Grid>
      </CardContent>

    </Card>
  );

}

export default Order;
