import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Cart from './ShoppingCart.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RegisterBox from './RegisterBox';
import Cookies from 'js-cookie';
import LoginBox from './LoginBox'
import NoticeBox from './NoticeBox';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { createHashHistory } from "history";
import axios from "axios";
import './css/Navigation.css';
// show bar when scroll up/ hide bar when scroll down
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Navigation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const username = Cookies.get("username");
  const name = Cookies.get("name");
  const accessRight = Cookies.get("accessRight");
  const [openLogoutSucc, setOpenLogoutSucc] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openLoginBox, setOpenLoginBox] = React.useState(false);
  const [openRegisterSucc, setOpenRegisterSucc] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleCloseLogoutSucc = () => {
    setOpenLogoutSucc(false);
    const history = createHashHistory();
    history.go("/");
  };
  const handleOpenRegister = () => {
    setOpenLoginBox(false);
    setOpenRegister(true);
  }
  const handleCloseRegisterDone = () => {
    setOpenRegister(false);
    setOpenRegisterSucc(true);
  };
  const handleCloseRegisterCancel = () => {
    setOpenRegister(false);
    setOpenLoginBox(true);
  };
  const handleCloseRegisterSucc = () => {
    setOpenRegisterSucc(false);
  };
  

  const handleUserMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const OpenLoginBox = () => {
    setOpenLoginBox(true);
  };

  const CloseLoginBox = () => {
    setOpenLoginBox(false);
  };
  // logout request
  const Logout = async() => {
    axios.defaults.withCredentials = true
    let logoutUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/logout` 
    axios.post(logoutUrl).then(result => {
        console.log(result);
    })
    Cookies.remove("username");
    Cookies.remove("token");
    Cookies.remove("accessRight");
    Cookies.remove("name");
    handleCloseUserMenu();
    setOpenLogoutSucc(true);
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <Cart 
        closebtnClick = {toggleDrawer("right", false)}
      />
    </div>
  );
// Navigation bar layouut
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className="navBar">
          <Toolbar>
            <Typography variant="h5" className="title">
              <RouterLink to="/" className="titletext">
                CU Food Order
              </RouterLink>
            </Typography>
            <div>
              {username && (
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleUserMenu}
                >
                  <AccountCircle />
              <div className="username">{name}</div>
                </IconButton>
              )}
              {
                !username && (
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={OpenLoginBox}
                  >
                    <AccountCircle />
                <div className="username">Login</div>
                  </IconButton>
                )}
              {accessRight == 0 && (
                <IconButton edge="start" className="cartbtn" color="inherit" aria-label="cart" onClick={toggleDrawer('right', true)}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              )}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={open}
                onClose={handleCloseUserMenu}
              >
                {username && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/profile">Profile</MenuItem>
                    {accessRight != 3 && 
                      <MenuItem component={RouterLink} to="/order">My Order</MenuItem>
                    }
                    {accessRight == 1 && 
                      <MenuItem component={RouterLink} to="/update_menu">My Menu</MenuItem>
                    }
                    {accessRight == 2 && 
                      <MenuItem component={RouterLink} to="/match_order">Match Order</MenuItem>
                    }
                    {accessRight == 3 && 
                      <MenuItem component={RouterLink} to="/find_record">Database Record</MenuItem>
                    }
                    {accessRight == 3 && 
                      <MenuItem component={RouterLink} to="/inquiry">Inquiry</MenuItem>
                    }
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                  </div>
                )}
              </Menu>
              {username && (
                <div>
                  <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                  </Drawer>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <LoginBox open={openLoginBox} onClose={CloseLoginBox} onRegister={handleOpenRegister} aria-labelledby="form-dialog-title" />
      <RegisterBox
        open={openRegister}
        onSuccClose={handleCloseRegisterDone}
        onCancelClose={handleCloseRegisterCancel}
        aria-labelledby="form-dialog-title" />
      <NoticeBox
        open={openLogoutSucc}
        onClose={handleCloseLogoutSucc}
        aria-labelledby="form-dialog-title"
        title="Logged out"
        content="You have logged out successfully" />
      <NoticeBox
        open={openRegisterSucc}
        onClose={handleCloseRegisterSucc}
        aria-labelledby="form-dialog-title"
        title="Register Successfully"
        content="You have register successfully. Please Login to order!" />
      </React.Fragment>
      
);
}