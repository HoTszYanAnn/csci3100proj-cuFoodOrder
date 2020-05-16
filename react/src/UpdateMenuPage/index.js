import React, { Component } from 'react';
import { Paper, FormControl, Select, MenuItem, InputLabel, Grid, Input, Button, InputAdornment, IconButton, Card, CardHeader, CardMedia, TextField, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import produce from "immer";
import Ordercard from '../components/ordercard'
import './updateMenu.css';
import NoticeBox from '../components/NoticeBox';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {defaultImage }from '../img/defaultImage'
//price format 
function PriceFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            
      thousandSeparator
      isNumericString
      prefix="HK$"
        />
    );
}

PriceFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class UpdateMenuPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            process: '',
            nowMenu: null,
            showingMenu: '',
            noticeContent:'',
            noticeTitle:'',
            openNotice: false,
            tempItem: {
                dish: '',
                description: '',
                price: '',
                imageAddress: defaultImage
            }
        }
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.onChangeMenu = this.onChangeMenu.bind(this);
        this.deleteMenuItem = this.deleteMenuItem.bind(this);
    }
    
    handleCloseNotice = () => {
        this.setState({ openNotice: false })
    };

    //get menu from server
    getExistMenu = async () => {
        axios.defaults.withCredentials = true
        let data = { username: Cookies.get("username") }
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/username_menu`
        axios.post(getMenuDataUrl, data).then(result => {
            let data = result.data
            this.setState({ menus: data.doc[0].findMenuUnderUsername, process: data.process })
        })
    }

    onChangeMenu = event => {
        this.setState({ showingMenu: event.target.value })
        if (event.target.value == this.state.menus.length) {
            this.setState(produce((state) => {
                state.nowMenu = {
                    menuName: "",
                    menuList: [],
                    restaurantName: Cookies.get("token")
                }
            }))
        }
        else
            this.setState({ nowMenu: this.state.menus[event.target.value] })

    }

    //delete menu item
    deleteMenuItem = (index) => {
        this.setState(produce((state) => {
            for (let i = index; i < state.nowMenu.menuList.length; i++) {
                state.nowMenu.menuList[i] = state.nowMenu.menuList[i + 1]
            }
            state.nowMenu.menuList.pop()
        }))
    }

    // append menu item
    appendMenuItem = () => {
        let value = this.state.nowMenu.menuList.length;
        this.setState(produce((state) => {
            state.nowMenu.menuList[value] = this.state.tempItem;
        }))
    }

    handleChangeItem = (prop, index) => event => {
        if (prop == "dish") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.nowMenu.menuList[index].dish = value;
            }))
        } else if (prop == "price") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.nowMenu.menuList[index].price = value;
            }))
        } else if (prop == "description") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.nowMenu.menuList[index].description = value;
            }))
        } else if (prop == "menuName") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.nowMenu.menuName = value;
            }))
        } else if (prop == 'file') {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => {
                this.setState(produce((state) => {
                    state.nowMenu.menuList[index].imageAddress = reader.result;
                }))
            }
        }
    }

    //update menu to server
    updateMenu = async () => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/update_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
        })
        this.setState({ noticeTitle: 'Update Successfully', noticeContent: 'You have updated the menu successfully'})
        this.setState({ openNotice: true })
    }

    //cancel change
    cancelMenu = () => {
        this.setState({ nowMenu: this.state.menus[this.state.showingMenu] })
    }

    //add new menu to server
    addMenu = async () => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/upload_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
            console.log(result);
        })
    }

    //delete menu from server
    deleteMenu = async () => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/delete_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
            this.setState({ showingMenu: "" })
        })
        this.setState({ noticeTitle: 'Delete Successfully', noticeContent: 'You have deleted the menu successfully'})
        this.setState({ openNotice: true })
    }

    // update menu page
    render() {
        let username = Cookies.get("username");
        let accessRight = Cookies.get("accessRight");

        if (accessRight != "1") {
            return <Redirect to="/" />
        }

        if (this.state.process == '') {
            this.getExistMenu();
        }
        let emptyField = false;
        if (this.state.nowMenu){
            console.log(this.state.nowMenu.menuList)
            for (let i = 0; i < this.state.nowMenu.menuList.length; i++){
                console.log(this.state.nowMenu.menuList[i])
                if (this.state.nowMenu.menuList[i].dish == "" || this.state.nowMenu.menuList[i].description == "" || this.state.nowMenu.menuList[i].price == ""){
                    emptyField = true;
                    break;
                }
            }
        }
        return (
            <React.Fragment>
                <Paper className="updateMenuContainer">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl style={{ width: '100%' }}>
                                <h1>Select the Menu you want to edit</h1>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.showingMenu}
                                    onChange={this.onChangeMenu}
                                >
                                    {this.state.menus && this.state.menus.map((menu, index) => {
                                        return <MenuItem key={index} value={index}>{menu.menuName}</MenuItem>
                                    })}
                                    <MenuItem value={this.state.menus.length}>Add new Menu</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    {(this.state.showingMenu !== '') &&
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <h3>MenuName</h3>
                                    <Input
                                        value={this.state.nowMenu.menuName}
                                        onChange={this.handleChangeItem('menuName', 0)}
                                    />
                                </FormControl>
                            </Grid>
                            {this.state.nowMenu.menuList.map((item, index) => {
                                return <Grid container key={index} direction="row" spacing={3}>
                                    <Grid item xs={6}>
                                        <div style={{ fontSize: '1.3rem', marginTop: '1rem', marginBottom: '1rem' }}>Preview</div>
                                        <Ordercard
                                            id={index}
                                            name={this.state.nowMenu.menuList[index].dish}
                                            description={this.state.nowMenu.menuList[index].description}
                                            price={this.state.nowMenu.menuList[index].price}
                                            img={this.state.nowMenu.menuList[index].imageAddress}
                                            disableBtn={true}
                                        />
                                    </Grid>
                                    <Grid item container key={index} xs={6} justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <FormControl style={{ width: '100%' }}>
                                                <InputLabel>Dish</InputLabel>
                                                <Input
                                                    value={this.state.nowMenu.menuList[index].dish}
                                                    onChange={this.handleChangeItem('dish', index)}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl style={{ width: '100%' }}>
                                                <InputLabel>Description</InputLabel>
                                                <Input
                                                    value={this.state.nowMenu.menuList[index].description}
                                                    onChange={this.handleChangeItem('description', index)}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl style={{ width: '100%' }}>
                                                <InputLabel>Price</InputLabel>
                                                <Input
                                                    value={this.state.nowMenu.menuList[index].price}
                                                    onChange={this.handleChangeItem('price', index)}
                                                    inputComponent={PriceFormatCustom}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item container xs={12} spacing={3}>
                                            <Grid item>Select Image:</Grid>
                                            <Grid item><input type="file" onChange={this.handleChangeItem('file', index)} /> </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{ width: '100%' }} variant="outlined" size="medium" color="secondary" onClick={() => this.deleteMenuItem(index)}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            })
                            }
                            <Grid item xs={12} style={{ marginTop: '1rem', marginBottom: '1rem' }} >
                                <Button style={{ width: '100%' }} variant="outlined" size="large" color="primary" onClick={this.appendMenuItem}>
                                    Add New Item
                                </Button>
                            </Grid>

                            {(this.state.showingMenu != this.state.menus.length) &&
                                <Grid container item xs={12} spacing={3} style={{ marginBottom: '1rem' }} >
                                    <Grid item xs={4}><Button style={{ width: '100%' }} variant="outlined" size="large" color="secondary" onClick={this.deleteMenu}>Delete</Button></Grid>
                                    <Grid item xs={4}><Button style={{ width: '100%' }} variant="outlined" size="large" onClick={this.cancelMenu}>Cancel</Button></Grid>
                                    <Grid item xs={4}><Button style={{ width: '100%' }} variant="outlined" size="large" color="primary" disabled={emptyField} onClick={this.updateMenu}>Update</Button></Grid>
                                </Grid>
                            }
                            {(this.state.showingMenu == this.state.menus.length) &&
                                <Grid item xs={12} style={{ marginBottom: '1rem' }} >
                                    <Button style={{ width: '100%', borderColor: 'green', color: 'green' }} variant="outlined" size="large" color="primary" onClick={this.addMenu}>Create</Button>
                                </Grid>
                            }
                        </Grid>
                    }
                </Paper>
                <NoticeBox
                    open={this.state.openNotice}
                    onClose={this.handleCloseNotice}
                    title={this.state.noticeTitle}
                    content={this.state.noticeContent} />
            </React.Fragment>
        );
    }
}

export default UpdateMenuPage;