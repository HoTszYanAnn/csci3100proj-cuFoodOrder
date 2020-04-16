import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from './RestaurantCard.js';
import { Redirect } from 'react-router-dom'

class Restaurants extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      menus:[
        {
            "_id": "5e970ee90f7ab909900ae8c7",
            "restaurantName": {
                "_id": "5e8eafb12585d30044fd83c5",
                "username": "hi"
            },
            "menuName": "sushiNew",
            "menuList": [
                {
                    "price": 500,
                    "_id": "5e970ee90f7ab909900ae8c8",
                    "dish": "salmon",
                    "description": "good"
                },
                {
                    "price": 1500,
                    "_id": "5e970ee90f7ab909900ae8c9",
                    "dish": "tuna",
                    "description": "very good"
                }
            ],
            "likes": 2000,
            "__v": 0
        }
    ],
      redirect: false,
    }
  }
  
  getRestaurantsMenu = async () => {
    const menusData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/menus/display_menu`, menusData);
      this.state.menus = await fetchResponse.json().then(function (a) {
        if (a.process == "success")
          return a.allMenuData;
        else {
          this.setState({ redirect: true })
        }
      });
      console.log(this.state.menus);
    } catch (e) {
      this.setState({ redirect: true });
      console.log(e);
    }
  }

  numbers =[1,2,3,4,5,6,7,8,9];
  


  render(){

    //this.getRestaurantsMenu();

    let cardItems = this.state.menus.map((menu) =>
    <Grid item xs={4} key={menu._id}>
        <RestaurantCard 
          restName={menu.restaurantName.username}
          updateDate="March 20, 2020"
          description="... testing 123"
          like={menu.likes}
          bestItems = {menu.menuList}
          linkName={menu.restaurantName.username}
        />
    </Grid>
)
    if (this.state.redirect) {
      return <Redirect to='/error'/>;
    }
  return (
    <div>
      <Grid container spacing={3}>
        {cardItems}
      </Grid>
    </div>
  );
}
}

export default Restaurants;
