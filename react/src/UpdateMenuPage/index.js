import React from 'react';
import Cookies from 'js-cookie';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import NoticeBox from '../components/NoticeBox';
import './order.css'

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        const username = Cookies.get("username");
        const accessRight = Cookies.get("accessRight");
        /*const navbar = props => {
            <header className="navbar">
                <nav className="navbar_navigate">
                    <div className="navbar_logo">LOGO</div>
                    <div className="space"></div>
                    <div className="navbar_navigate-items">
                        <ul>
                            <li><a href="/">Item 1</a></li>
                            <li><a href="/">Item 2</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        };*/

        if (accessRight != "1") {
            return <Redirect to="/" />
        }
            
        /*function expand_item-list() {
        
        };
            
        function expand_menu-list() {
        
        };*/
        
        return (
            <React.Fragment>
                <Paper className="menuContainer">
                    <div className="menuList">
                        update_menu
                    </div>
                    /*<div className="menuName">
                        <table>
                            <tr>
                                <td>Item</td>
                                <div className="space"></div>
                                <td>Price</td>
                            </tr>
                            <button onClick={expand_item-list}>Expand item</button>
                        </table>
                    </div>
                    <div><button onClick={expand_menu-list}>Expand menu</button></div>*/
                </Paper>
            </React.Fragment>
        );
    }
}

export default OrderPage;
