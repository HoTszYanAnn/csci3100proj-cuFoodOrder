import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from './RestaurantCard.js';
import { Redirect } from 'react-router-dom'
import axios from'axios';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      redirect: false,
      notGet: true
    }
  }

  getRestaurantsMenu = async () => {
    axios.defaults.withCredentials = true
    let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/display_menu`
    axios.post(getMenuDataUrl).then(result => {
        this.setState({ showingMenu:"", menus: result.data.allMenuData })
    })
    this.setState({notGet:false});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/error' />;
    }
    
    if (this.state.notGet)
      this.getRestaurantsMenu();
    console.log(this.state.menus)
    
    return (
      <div>
        <Grid container spacing={3}>
          {this.state.menus && this.state.menus.map((menu) =>
            <Grid item xs={4} key={menu._id}>
              <RestaurantCard
                restName={menu.restaurantName.username}
                updateDate="March 20, 2020"
                description="... testing 123"
                like={menu.likes}
                bestItems={menu.menuList}
                linkName={menu.restaurantName.username}
                id = {menu._id}
                getAgain ={this.getRestaurantsMenu}
              />
            </Grid>)}
        </Grid>
      </div>
    );
  }
}

export default Restaurants;
