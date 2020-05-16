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
            restmenu: [],
            restData:'',
            restaurantTitle: "abc Restaurant",
            name : "" ,
            item : [],
            cart : []
        }
        sessionStorage.setItem('myCart', JSON.stringify(this.state.item));
    }

    componentDidMount = () => {
        this.getMenu();
        console.log(this.state.restData);
    }


    getMenu = async () => {
        let restName=this.props.match.params.restName
        axios.defaults.withCredentials = true
        var username={username:restName}
        let menuUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/username_menu`;
        axios.post(menuUrl, username).then(res => {
            if (res.data) {
                var datas = res.data.doc[0];
                console.log(res.data)
                this.setState({
                    restmenu: datas.findMenuUnderUsername,
                    restData: datas
                })
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <img src={this.state.restData.image} className="topbigimage" />
                    <div className="content-title">
                        <div className="apptitle">{this.state.restData.name}</div>
                    </div>
                    <div className="content-description">
                        <div>{this.state.restData.introduction}</div>
                    </div>
                </div>
                <div className="orderMenuBox">
                    <Grid container spacing={3}>
                        {this.state.restmenu.map(({ _id, menuName, menuList }, i) => {
                            return <Grid item xs={12} key={i}>
                                <h1> {menuName}</h1>
                                <Divider style={{margin: '1rem 0'}}/>
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