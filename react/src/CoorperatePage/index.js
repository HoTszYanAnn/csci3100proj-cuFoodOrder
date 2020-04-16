import React from 'react';
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
import Cookies from 'js-cookie';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link as RouterLink } from 'react-router-dom';
import './Coorperate.css';

class CoorperatePage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      name: '',
      address: '',
      email: '',
      payment: '',
      mobile: '',
      error_message: '',
      accessRight: '',
      showPassword: false
    };

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleChangeRegister = this.handleChangeRegister.bind(this)
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
    //setLoginValues({ ...this.state.loginValues, showPassword: !this.state.showPassword });
  };
  handleChangeRegister = prop => event => {
    //setLoginValues({ ...this.state.loginValues, [prop]: event.target.value });
    this.setState({ [prop]: event.target.value })
  };


  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  SubmitLoginBox = () => {
    var data = this.RegisterRequest();
  };

  RegisterRequest = async () => {
    const location = window.location.hostname;
    const loginData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name, username: this.state.username, password: this.state.password, address: this.state.address, mobile: this.state.mobile, emailAddress: this.state.email, paymentInfo: this.state.payment, accessRight: this.state.accessRight })
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/register`, loginData);
      const data = await fetchResponse.json().then(function (a) {
        return a;
        console.log(a);
      });

      console.log(data);
      if (data.process == 'success') {
        this.setErrorMessage("");
        this.props.onClose();
      } else {
        console.log(data);
        this.setErrorMessage(data.err);
      }
    } catch (e) {
      return e;
    }
  }


  render() {
    return (
      <React.Fragment>
        <Paper className="coorperateContainer">
          <div className="coorperateForm">
            <h1>Coorperate With Us</h1>
            <form>
              <DialogContent>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.name}
                    onChange={this.handleChangeRegister('name')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.username}
                    onChange={this.handleChangeRegister('username')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChangeRegister('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.address}
                    onChange={this.handleChangeRegister('address')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Mobile</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.mobile}
                    onChange={this.handleChangeRegister('mobile')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.email}
                    onChange={this.handleChangeRegister('email')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-username">Payment</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.payment}
                    onChange={this.handleChangeRegister('payment')}
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.accessRight}
                  labelWidth={70}
                  onChange={this.handleChangeRegister('accessRight')}
                >
                  <MenuItem value={1}>Restaurant Owner</MenuItem>
                  <MenuItem value={2}>Courier</MenuItem>
                </Select>
                </FormControl>
                {this.state.error_message}
              </DialogContent>
              <DialogActions>
                <div style={{ flex: '1 0 0' }} />
                <Button variant="outlined" color="secondary" component={RouterLink} to="/">
                  Back
                </Button>
                <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}
export default CoorperatePage;