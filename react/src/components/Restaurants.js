import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from './RestaurantCard.js';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      redirect: false,
      notGet: true,
    }
  }
  // update restuarant like to server
  plusOne = async (id) => {
    axios.defaults.withCredentials = true
    let addLikeUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/likes_rest_plus`
    console.log(id)
    let data = { _id: id }
    axios.post(addLikeUrl, data).then(result => {
      console.log(result)
      this.setState({ notGet: true })
    })
  }

  //get restaurant list from server
  getRestaurantsMenu = async () => {
    axios.defaults.withCredentials = true
    let getRestsDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/display_menu_restname`
    axios.post(getRestsDataUrl).then(result => {
      this.setState({ showingMenu: "", restaurants: result.data.doc })
    })
  }
  // home page restaurant coumn layout
  render() {
    if (this.state.redirect) {
      return <Redirect to='/error' />;
    }
    if (this.state.notGet) {
      this.getRestaurantsMenu();
      this.setState({ notGet: false })
    }
    return (
      <div>
        <Grid container spacing={3}>
          {this.state.restaurants && this.state.restaurants.map((restaurant, index) =>
            <Grid item xs={4} key={index}>
              <RestaurantCard
                restaurant={restaurant}
                plusOne={this.plusOne}
              />
            </Grid>)}
        </Grid>
      </div>
    );
  }
}

export default Restaurants;
