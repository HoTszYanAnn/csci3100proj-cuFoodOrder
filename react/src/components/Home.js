import React from 'react';
import image from '../img/cuhk.jpeg';
import Restaurants from './Restaurants.js';
import './css/Home.css';
const home = () => {
    return (
      <React.Fragment>
       <div className="container">
       <img src={image} className="topbigimage"/>
       <div className="content-title">
         <div className="apptitle">CU Food Order</div>
       </div>
       <div className="content-description">
         <div>For ... description</div>
       </div>
     </div>
     <div>
     <div className="restaurant">
        <h1 className="restaurant-heading">Restaurant</h1>
        <Restaurants/>
     </div>
     </div>
     </React.Fragment>
    );
}
 
export default home;