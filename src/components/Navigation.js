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
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const username = Cookies.get("username");

  const [loginValues, setLoginValues] = React.useState({
    password: '',
    username: '',
    showPassword: false,
  });
  const [openLogoutSucc, setOpenLogoutSucc] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseLogoutSucc = () => {
    setOpenLogoutSucc(false);
  };
  const handleChangeLogin = prop => event => {
    setLoginValues({ ...loginValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setLoginValues({ ...loginValues, showPassword: !loginValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleUserMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const [openLoginBox, setOpenLoginBox] = React.useState(false);

  const OpenLoginBox = () => {
    setOpenLoginBox(true);
  };

  const CloseLoginBox = () => {
    setOpenLoginBox(false);
  };
  const Logout = () => {
    Cookies.remove("username");
    setOpenLogoutSucc(true);
  }
  const SubmitLoginBox = () => {
    Cookies.set("username", loginValues.username)
    setOpenLoginBox(false);
  };

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
              CU Food Order
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
      <Dialog open={openLoginBox} onClose={CloseLoginBox} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><div className="navlogin-title">Login</div></DialogTitle>
        <DialogContent>
          <FormControl variant="outlined"
            margin="dense" fullWidth>
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              value={loginValues.username}
              onChange={handleChangeLogin('username')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined"
            margin="dense" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={loginValues.showPassword ? 'text' : 'password'}
              value={loginValues.password}
              onChange={handleChangeLogin('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {loginValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={SubmitLoginBox} variant="outlined" color="primary">
            Register
                </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button onClick={CloseLoginBox} variant="outlined" color="secondary">
            Cancel
                </Button>
          <Button onClick={SubmitLoginBox} variant="outlined" color="primary">
            Login
                </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={openLogoutSucc}
        onClose={handleCloseLogoutSucc}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" margin="dense">{"Logout Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have logged out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseLogoutSucc} color="primary" variant="outlined">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}