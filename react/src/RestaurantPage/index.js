import React from 'react';
import { withRouter, Redirect } from "react-router";
import image from '../img/cuhk.jpeg';
import './restaurantPage.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Ordercard from '../components/ordercard.js';
import Img from '../img/test.jpg';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    backgroundColor: '#41c7c2',
}));

class RestaurantsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [{
                _id: 1233,
                menuName: "Hambergur",
                price: 123,
                imgs: Img,
            }, {
                _id: 5646,
                menuName: "hi",
                price: 234,
                imgs: Img,
            }],
            item: [

            ],
            restmenu: [],
            userData:'',
            restaurantTitle: "abc Restaurant",
            name : "" 
        }

        sessionStorage.setItem('myCart', JSON.stringify(this.state.item));
       

    }

    componentDidMount = () => {
        this.getMenu();
        this.getUserData();
    }
    getUserData = async (input) => {
        axios.defaults.withCredentials = true
        let getDataUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/user_data`
        axios.post(getDataUrl).then(result => {
            let data = result.data.customerData
            console.log(result);
            this.setState({ userData: data})
        })
    }
    getMenu = async () => {
        let restName=sessionStorage.getItem('restName',)
        restName=JSON.parse(restName);
        
        axios.defaults.withCredentials = true
        var username={username:restName}
        
        let menuUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/username_menu`;
        axios.post(menuUrl, username).then(res => {
            if (res.data) {
                var datas = res.data.doc[0].findMenuUnderUsername;
                this.setState({
                    restmenu: datas
                })
                console.log(res.data.doc)
            }

        }).catch((e) => {
            console.log(e);
        });
    }

    render() {


        return (
            <React.Fragment>
                <div className="container">
                    <img src={image} className="topbigimage" />
                    <div className="content-title">
                        <div className="apptitle">{this.state.userData.name}</div>
                    </div>
                    <div className="content-description">
                        <div>{this.state.userData.introduction}</div>
                    </div>
                </div>
                <div className="orderMenuBox">
                    <Grid container spacing={3} direction="column">
                        {this.state.restmenu.map(({ _id, menuName, menuList }, i) => {
                            return <Grid item xs={12} key={i._id}>
                                <h1> {menuName}</h1>
                                <Divider />
                                <Grid container spacing={3}>
                                {menuList.map((menu) => {
                                    return <Grid container item xs={4} key={menu._id} >
                                        <Ordercard
                                            id={menu._id}
                                            name={menu.dish}
                                            description={menu.description}
                                            price={menu.price}
                                            img={menu.imageAddress}
                                        />
                                        </Grid>
                                })}
                                </Grid>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(RestaurantsPage);