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
import Cookies from 'js-cookie';

class RegisterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      name: '',
      address: '',
      email: '',
      payment: '',
      mobile :'',
      error_message: '',
      showPassword: false
    };

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleChangeLogin = this.handleChangeLogin.bind(this)
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
    //setLoginValues({ ...this.state.loginValues, showPassword: !this.state.showPassword });
  };
  handleChangeLogin = prop => event => {
    //setLoginValues({ ...this.state.loginValues, [prop]: event.target.value });
    this.setState({ [prop]: event.target.value })
  };


  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  SubmitLoginBox = () => {
    var data = this.RegisterRequest();
    this.props.onSuccClose();
  };

  RegisterRequest = async () => {
    const location = window.location.hostname;
    const loginData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: this.state.name, username: this.state.username, password: this.state.password ,address: this.state.address, mobile : this.state.mobile,emailAddress: this.state.email ,paymentInfo: this.state.payment,accessRight: 0})
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
    console.log(this.props);
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}>
        <DialogTitle id="form-dialog-title"><div className="navlogin-title">Register</div></DialogTitle>
        <form>
          <DialogContent>
            <FormControl variant="outlined"
              margin="dense" fullWidth>
              <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.name}
                onChange={this.handleChangeLogin('name')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth>
              <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.username}
                onChange={this.handleChangeLogin('username')}
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
                onChange={this.handleChangeLogin('password')}
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
                onChange={this.handleChangeLogin('address')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth>
              <InputLabel htmlFor="outlined-adornment-username">Mobile</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.mobile}
                onChange={this.handleChangeLogin('mobile')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth>
              <InputLabel htmlFor="outlined-adornment-username">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.email}
                onChange={this.handleChangeLogin('email')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth>
              <InputLabel htmlFor="outlined-adornment-username">Payment</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.payment}
                onChange={this.handleChangeLogin('payment')}
                labelWidth={70}
              />
            </FormControl>
            {this.state.error_message}
          </DialogContent>
          <DialogActions>
            <div style={{ flex: '1 0 0' }} />
            <Button onClick={this.props.onCancelClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default RegisterPage;
