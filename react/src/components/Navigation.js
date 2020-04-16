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
import './css/Navigation.css';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Cart from './ShoppingCart.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RegisterBox from './RegisterBox';
import Cookies from 'js-cookie';
import LoginBox from './LoginBox'
import NoticeBox from './NoticeBox';
import { Link as RouterLink } from 'react-router-dom';

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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
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
  const [openLogoutSucc, setOpenLogoutSucc] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openLoginBox, setOpenLoginBox] = React.useState(false);
  const [openRegisterSucc, setOpenRegisterSucc] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseLogoutSucc = () => {
    setOpenLogoutSucc(false);
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
  const Logout = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    handleCloseUserMenu();
    setOpenLogoutSucc(true);
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Cart />
    </div>
  );

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
                  <div className="username">{username ? username : 'Login'}</div>
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
                    <div className="username">{username ? username : 'Login'}</div>
                  </IconButton>
                )}
              {username && (
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
                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
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