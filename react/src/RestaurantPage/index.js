import React from 'react';
import { withRouter } from "react-router";
import image from '../img/cuhk.jpeg';
import Paper from '@material-ui/core/Paper';
import './restaurantPage.css';


class RestaurantsPage extends React.Component {

    restaurantTitle = "abc Restaurant";

    menuItems = [{
        name: "hi222",
        price: "123"
    }, {
        name: "hi",
        price: "123"
    }];

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <img src={image} className="topbigimage" />
                    <div className="content-title">
                        <div className="apptitle">{this.restaurantTitle}</div>
                    </div>
                    <div className="content-description">
                        <div>For ... description</div>
                    </div>
                </div>
                <div className="orderMenuBox">
                <Paper elevation={3} >
                    <div>
                    {this.props.match.params.restName}
                    {this.menuItems.map((menuItem) =>
                        <div key={menuItem.name}>
                            {menuItem.name}
                            {menuItem.price}
                        </div>
                    )}
                    </div>
                </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(RestaurantsPage);
