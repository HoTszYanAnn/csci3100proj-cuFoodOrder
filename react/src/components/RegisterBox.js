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
      mobile: '',
      pwError: false,
      pwErrorText: '',
      mobileError: false,
      mobileErrorText: '',
      emailError: false,
      emailErrorText: '',
      addError: false,
      addErrorText: '',
      payError: false,
      payErrorText: '',
      unError: false,
      unErrorText: '',
      nameError: false,
      nameErrorText: '',
      submitBtn: false,
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
    if (prop == "password") {
      if (event.target.value.length < 8)
        this.setState({ pwError: true, pwErrorText: "Too Short" })
      else
        this.setState({ pwError: false, pwErrorText: "" })
    }
    if (prop == "mobile") {
      let mobileReg = /^-?[0-9]+$/;
      if (!(mobileReg.test(event.target.value)))
        this.setState({ mobileError: true, mobileErrorText: "Please input number only!" })
      else if (event.target.value.length != 8)
        this.setState({ mobileError: true, mobileErrorText: "The phone number not valid!" })
      else
        this.setState({ mobileError: false, mobileErrorText: "" })
    }

    if (prop == "payment") {
      let payReg = /^-?[0-9]+$/;
      if (!(payReg.test(event.target.value))) {
        //this.state.payError = true;
        //this.state.payErrorText = "Please input number only!";
        this.setState({ payError: true, payErrorText: "Please input number only!" })
      } else if (event.target.value.length != 16) {
        //this.state.payError = true;
        //this.state.payErrorText = "Please input 16-digit credit card number";
        this.setState({ payError: true, payErrorText: "Please input 16-digit credit card number" })
      } else {
        //this.state.payError = false;
        //this.state.payErrorText = "";
        this.setState({ payError: false, payErrorText: "" })
      }
    }
    if (prop == "email") {
      let emailReg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      if (!(emailReg.test(event.target.value)))
        this.setState({ emailError: true, emailErrorText: "Please input valid email address!" })
      else
        this.setState({ emailError: false, emailErrorText: "" })
    }
    if (prop == "address") {
      if (event.target.value.length == 0)
        this.setState({ addError: true, addErrorText: "Cannot be empty" })
      else
        this.setState({ addError: false, addErrorText: "" })
    }

    if (prop == "name") {
      if (event.target.value.length == 0)
        this.setState({ nameError: true, nameErrorText: "Cannot be empty" })
      else
        this.setState({ nameError: false, nameErrorText: "" })
    }

    if (prop == "username") {
      if (this.compareUsername(event.target.value.length) == "failed")
        this.setState({ unError: true, unErrorText: "Existed username, please enter a new one" })
      else
        this.setState({ unError: false, unErrorText: "" })
    }
    this.setState({ [prop]: event.target.value })
  };

  compareUsername = async (input) => {
    const compareData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: input })
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/username_match`, compareData);
      const data = await fetchResponse.json().then(function (a) {
        return a.process;
      });
    } catch (e) {
      return e;
    }
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  SubmitLoginBox = () => {
    var data = this.RegisterRequest();
    this.props.onSuccClose();
  };

  RegisterRequest = async () => {
    const loginData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name, username: this.state.username, password: this.state.password, address: this.state.address, mobile: this.state.mobile, emailAddress: this.state.email, paymentInfo: this.state.payment, accessRight: 0 })
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/register`, loginData);
      const data = await fetchResponse.json().then(function (a) {
        return a;
      });

      if (data.process == 'success') {
        this.setErrorMessage("");
        this.props.onClose();
      } else {
        this.setErrorMessage(data.err);
      }
    } catch (e) {
      return e;
    }
  }


  render() {
    if (!(this.state.addError) && !(this.state.emailError) && !(this.state.nameError) && !(this.state.unError) && !(this.state.mobileError) && !(this.state.payError) && !(this.state.pwError))
      if (this.state.username && this.state.address && this.state.email && this.state.mobile && this.state.name && this.state.password && this.state.payment) {
        this.state.submitBtn = true;
      }
      else {
        this.state.submitBtn = false;
      }
    else
      this.state.submitBtn = false;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}>
        <DialogTitle id="form-dialog-title"><div className="navlogin-title">Register</div></DialogTitle>
        <form>
          <DialogContent>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.nameError}>
              <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.name}
                onChange={this.handleChangeLogin('name')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.nameErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.unError}>
              <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.username}
                onChange={this.handleChangeLogin('username')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.unErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth
              error={this.state.pwError}
            >
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
              <div className="ErrorMessage">{this.state.pwErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.addError}>
              <InputLabel htmlFor="outlined-adornment-username">Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.address}
                onChange={this.handleChangeLogin('address')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.addErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.mobileError}>
              <InputLabel htmlFor="outlined-adornment-username">Mobile</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.mobile}
                onChange={this.handleChangeLogin('mobile')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.mobileErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.emailError}>
              <InputLabel htmlFor="outlined-adornment-username">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.email}
                onChange={this.handleChangeLogin('email')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.emailErrorText}</div>
            </FormControl>
            <FormControl variant="outlined"
              margin="dense" fullWidth error={this.state.payError}>
              <InputLabel htmlFor="outlined-adornment-username">Payment</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                value={this.state.payment}
                onChange={this.handleChangeLogin('payment')}
                labelWidth={70}
              />
              <div className="ErrorMessage">{this.state.payErrorText}</div>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <div style={{ flex: '1 0 0' }} />
            <Button onClick={this.props.onCancelClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary" disabled={!this.state.submitBtn}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default RegisterPage;
