
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from '@material-ui/core/Checkbox';
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import ShoppingCart from '../components/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
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
    }
  }));
const Order= props=> {
    
    const classes = useStyles();
    var  [selection,setselect]=useState(false);
    const [name,setname]=useState(props.name);
    const [price,setprice]=useState(props.price);
    const handleChange = (event) => {
        
        if(selection==true){
            setselect(false);
        }else{
            setselect(true);
        }

          console.log('changed!!'+selection+props.price)
        
       
      };
  
  
      
    return (
      <Card className={classes.root}>
      <CardHeader
        className={classes.CardHeader}
        titleTypographyProps={{ variant: "h6" }}
        title={props.name}
        subheader="September 14, 2016"
        action={
          <Checkbox
            style={{ width: 50, height: 50 }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            onChange={handleChange}
          />
        }
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
        
      </CardContent>
    </Card>
    
    );
    
  }
  
  export default Order;
 