import React from 'react';
import image from '../img/cuhk.jpeg';
import Restaurants from '../components/Restaurants.js';
import { Button } from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import './Home.css';

function HomePage() {
  return (
    <React.Fragment>
      <div className="container">
        <img src={image} className="topbigimage" />
        <div className="content-title">
          <div className="apptitle">CU Food Order</div>
        </div>
        <div className="content-description">
          <div>For ... description</div>
        </div>
      </div>
      <div className="mainContent">
        <div className="restaurant">
          <h1 className="restaurant-heading">Restaurant</h1>
          <Restaurants />
        </div>
        <div className="coorperate">
          <h1>Cooperate with us!</h1>
          <div className="coorperate-box">
            <div >
              <p>Want to join us as restaurant owner?</p>
              <p>Want to join us as courier?</p>
            </div>
            <div>
            <Button variant="outlined" color="secondary" size="large" component={RouterLink} to="/coorperate">Register Now!</Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;