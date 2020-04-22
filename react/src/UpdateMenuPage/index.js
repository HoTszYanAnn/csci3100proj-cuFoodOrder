import React, { Component } from 'react';
import { Paper, FormControl, Select, MenuItem, InputLabel, Grid, Input, Button, InputAdornment, IconButton } from '@material-ui/core';
import Cookies from 'js-cookie';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import produce from "immer";
import './updateMenu.css';

class UpdateMenuPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            process: '',
            nowMenu: null,
            showingMenu: '',
            tempItem: {
                dish: '',
                description: '',
                price: '',
                imageAddress: null
            }
        }
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.onChangeMenu = this.onChangeMenu.bind(this);
        this.deleteMenuItem = this.deleteMenuItem.bind(this);
    }

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
        if (event.target.value == this.state.menus.length){
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

    deleteMenuItem = (index) => {
        this.setState(produce((state) => {
            for (let i = index; i < state.nowMenu.menuList.length; i++) {
                state.nowMenu.menuList[i] = state.nowMenu.menuList[i + 1]
            }
            state.nowMenu.menuList.pop()
        }))
    }

    appendMenuItem = () => {
        let value = this.state.nowMenu.menuList.length;
        this.setState(produce((state) => {
            state.nowMenu.menuList[value] = this.state.tempItem;
            state.tempItem.dish = "";
            state.tempItem.description = "";
            state.tempItem.price = "";
            state.tempItem.imageAddress = null;
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
        } else if (prop == 'tempFile') {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => {
                this.setState(produce((state) => {
                    state.tempItem.imageAddress = reader.result;
                }))
            }

        } else if (prop == "tempPrice") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.tempItem.price = value;
            }))
        } else if (prop == "tempDish") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.tempItem.dish = value;
            }))
        } else if (prop == "tempDescription") {
            let value = event.target.value
            this.setState(produce((state) => {
                state.tempItem.description = value;
            }))
        }
    }
    updateMenu = async () => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/update_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
        })
    }
    addMenu = async() => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/upload_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
            console.log(result);
        })
    }
    deleteMenu = async() => {
        axios.defaults.withCredentials = true
        let getMenuDataUrl = `${process.env.REACT_APP_API_URL}/catalog/menus/delete_menu`
        axios.post(getMenuDataUrl, this.state.nowMenu).then(result => {
            this.getExistMenu();
            this.setState({ showingMenu:""})
        })
    }

    render() {
        let username = Cookies.get("username");
        let accessRight = Cookies.get("accessRight");

        if (accessRight != "1") {
            return <Redirect to="/" />
        }

        if (this.state.process == '') {
            this.getExistMenu();
        }
        return (
            <React.Fragment>
                <Paper className="updateMenuContainer">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel>Select the Menu you want to edit</InputLabel>
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
                    <hr style={{marginTop: '1rem', marginBottom:'1rem'}} />
                    {(this.state.showingMenu !== '') &&
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Menu Name</InputLabel>
                                    <Input
                                        value={this.state.nowMenu.menuName}
                                        onChange={this.handleChangeItem('menuName', 0)}
                                    />
                                </FormControl>
                            </Grid>
                            {this.state.nowMenu.menuList.map((item, index) => {
                                return <Grid container item spacing={3} key={index} >
                                    <Grid item xs={1}>
                                        <IconButton aria-label="delete" onClick={() => this.deleteMenuItem(index)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel>Dish</InputLabel>
                                            <Input
                                                value={this.state.nowMenu.menuList[index].dish}
                                                onChange={this.handleChangeItem('dish', index)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel>Description</InputLabel>
                                            <Input
                                                value={this.state.nowMenu.menuList[index].description}
                                                onChange={this.handleChangeItem('description', index)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel>Price</InputLabel>
                                            <Input
                                                value={this.state.nowMenu.menuList[index].price}
                                                onChange={this.handleChangeItem('price', index)}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input type="file" onChange={this.handleChangeItem('file', index)} />
                                        <img src={this.state.nowMenu.menuList[index].imageAddress} />
                                    </Grid>
                                </Grid>
                            })
                            }

                            <Grid container item spacing={3}>
                                <Grid item xs={1}>
                                    <IconButton aria-label="add" onClick={this.appendMenuItem}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel>Dish</InputLabel>
                                        <Input
                                            value={this.state.tempItem.dish}
                                            onChange={this.handleChangeItem('tempDish', 0)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel>Description</InputLabel>
                                        <Input
                                            value={this.state.tempItem.description}
                                            onChange={this.handleChangeItem('tempDescription', 0)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel>Price</InputLabel>
                                        <Input
                                            value={this.state.tempItem.price}
                                            onChange={this.handleChangeItem('tempPrice', 0)}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>
                                <input type="file" onChange={this.handleChangeItem('tempFile', 0)} />
                                <img src={this.state.tempItem.imageAddress} />
                            </Grid>
                            {(this.state.showingMenu != this.state.menus.length) &&
                                <Grid>
                                    <Button onClick={this.updateMenu}>Update</Button>
                                    <Button onClick={this.updateMenu}>Cancel</Button>
                                    <Button onClick={this.deleteMenu}>Delete</Button>
                                </Grid>
                            }
                            {(this.state.showingMenu == this.state.menus.length) &&
                                <Grid>
                                    <Button onClick={this.addMenu}>Create</Button>
                                </Grid>
                            }
                        </Grid>
                    }
                </Paper>
            </React.Fragment>
        );
    }
}

export default UpdateMenuPage;