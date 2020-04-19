
import React,{useState,useContext} from 'react';
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
    
    typography:{
        fontfamily:['Roboto'],
        fontSize:['30px'],
        color:['red'],
    },
    b:{
      fontSize:['20px']
    },
    CardHeader: {
      backgroundColor: '#B3FFB3',
      color: '#626769'
    },
    margin:{
      margin: theme.spacing(1),
    } 
  }));
const Order= props=> {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
 
    //var [cartid,setCartid]=useState();
    var [value, setvalue]=useState(1);
    

  
    const addToCart = () => {
      let cart=sessionStorage.getItem('myCart',)
      cart=JSON.parse(cart);
      
      //let obj={id:cart.id, name:cart.name, price: cart.price}
      let newobj=[{id:props.id, name:props.name, price: props.price,quantity:value}]
      
      let obj=[...cart,...newobj];
      console.log(obj);
      sessionStorage.setItem('myCart',JSON.stringify(obj));
      
    
    }
    const plusOne=()=>{
        var n=parseInt(value)+1;
        setvalue(n);
      
    }
    const decOne=()=>{
      if(value==1){
        setvalue(1);
      }else{
      var n=parseInt(value)-1;
      setvalue(n);
    }
  }
 
    return (
      
      <Card className={classes.root}> 
      <CardHeader
        className={classes.CardHeader}
        titleTypographyProps={{ variant: "h6" }}
        title={props.name}
        subheader="September 14, 2016"
        
      />
      <CardMedia
        className={classes.image}
        image={props.img}
        title="Paella dish"
        alignItems="center"
      justify="center"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
          <b className={classes.b}>HK$</b> <b>{props.price}</b>
          
        </Typography>
        <Grid container justify="center" paddingTop='10px'>
          
        <IconButton  color="primary"onClick={decOne}><IndeterminateCheckBoxIcon/></IconButton>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={value}
            disabled
          />
        </FormControl>
        <IconButton  color="primary" onClick={plusOne}><AddBoxIcon/></IconButton>
        
        <Button paddingTop='10' variant="contained" color="secondary" size="large" onClick={addToCart} >Add to Cart</Button>
       
        </Grid>
      </CardContent>
      
    </Card>
    );
    
  }
  
  export default Order;
 