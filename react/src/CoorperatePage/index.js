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
import { Link as RouterLink, Redirect } from 'react-router-dom';
import NoticeBox from '../components/NoticeBox';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {defaultImage }from '../img/defaultImage'
import './Coorperate.css';



function CreditCardFormatCustom(props) {
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
            format="#### #### #### ####"
        />
    );
}

CreditCardFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

function PhoneNumberFormatCustom(props) {
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
            format="#### ####"
        />
    );
}

PhoneNumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
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
      accessRight: '',
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
      arError: false,
      showPassword: false,
      openRegisterSucc: false,
      redirect: false,
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
    if (prop == "password") {
      if (event.target.value.length < 8)
        this.setState({ pwError: true, pwErrorText: "Too Short" })
      else
        this.setState({ pwError: false, pwErrorText: "" })
    }
    if (prop == "mobile") {
      if (event.target.value.length != 8)
        this.setState({ mobileError: true, mobileErrorText: "The phone number not valid!" })
      else
        this.setState({ mobileError: false, mobileErrorText: "" })
    }

    if (prop == "payment") {
      if (event.target.value.length != 16) {
        this.setState({ payError: true, payErrorText: "Please input 16-digit credit card number" })
      } else {
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
      if (event.target.value.length == 0)
        this.setState({ unError: true, unErrorText: "Cannot be empty" })
      else
        this.compareUsername(event.target.value);
    }
    this.setState({ [prop]: event.target.value })
  };

  handleCloseRegisterSucc = () => {
    this.setState({openRegisterSucc: false})
    this.state.redirect = true;
  };
  handleOpenRegisterSucc = () => {
    this.setState({openRegisterSucc: true})
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  SubmitLoginBox = () => {
    var data = this.RegisterRequest();
    this.handleOpenRegisterSucc();
  };

  RegisterRequest = async () => {
    const imageUrl= defaultImage;
    console.log(imageUrl);
    const loginData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageUrl, name: this.state.name, username: this.state.username, password: this.state.password, address: this.state.address, mobile: this.state.mobile, emailAddress: this.state.email, paymentInfo: this.state.payment, accessRight: this.state.accessRight, introduction: '', likes: '0' })
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/register`, loginData);
      const data = await fetchResponse.json().then(function (a) {
        return a;
      });
      if (data.process == 'success') {
        console.log(data)
        this.setErrorMessage("");
        this.props.onClose();
      } else {
        this.setErrorMessage(data.err);
      }
    } catch (e) {
      return e;
    }
  }
  compareUsername = async (input) => {
    const compareData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: input })
    };
    console.log(input);
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/username_match`, compareData);
      const data = await fetchResponse.json().then(function (a) {
        return a.process;
      });
      if (data == 'failed'){
        this.setState({ unError: true, unErrorText: "Existed username, please enter a new one" });
      }
      else{
        this.setState({ unError: false, unErrorText: "" })
      }
      return;
    } catch (e) {
      return e;
    }
  }

  render() {
    if (this.state.redirect){
      return <Redirect to="/"/>
    }
    if (!(this.state.addError) && !(this.state.emailError) && !(this.state.nameError) && !(this.state.unError) && !(this.state.mobileError) && !(this.state.payError) && !(this.state.pwError))
      if (this.state.username && this.state.accessRight && this.state.address && this.state.email && this.state.mobile && this.state.name && this.state.password && this.state.payment) {
        this.state.submitBtn = true;
      }
      else {
        this.state.submitBtn = false;
      }
    else
      this.state.submitBtn = false;
    return (
      <React.Fragment>
        <Paper className="coorperateContainer">
          <div className="coorperateForm">
            <h1>Coorperate With Us</h1>
            <form>
              <DialogContent>
                <FormControl variant="outlined"
                  margin="dense" fullWidth error={this.state.nameError}>
                  <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.name}
                    onChange={this.handleChangeRegister('name')}
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
                    onChange={this.handleChangeRegister('username')}
                    labelWidth={70}
                  />
                  <div className="ErrorMessage">{this.state.unErrorText}</div>
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth error={this.state.pwError}>
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
                  <div className="ErrorMessage">{this.state.pwErrorText}</div>
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth error={this.state.addError}>
                  <InputLabel htmlFor="outlined-adornment-username">Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.address}
                    onChange={this.handleChangeRegister('address')}
                    labelWidth={70}
                  />
                  <div className="ErrorMessage">{this.state.addErrorText}</div>
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth error={this.state.mobileError}>
                  <InputLabel htmlFor="outlined-adornment-username">Tel No.</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.mobile}
                    onChange={this.handleChangeRegister('mobile')}
                    labelWidth={70}
                    inputComponent={PhoneNumberFormatCustom}
                  />
                  <div className="ErrorMessage">{this.state.mobileErrorText}</div>
                </FormControl>
                <FormControl variant="outlined"
                  margin="dense" fullWidth error={this.state.emailError}>
                  <InputLabel htmlFor="outlined-adornment-username">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    value={this.state.email}
                    onChange={this.handleChangeRegister('email')}
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
                    onChange={this.handleChangeRegister('payment')}
                    labelWidth={70}
                    inputComponent={CreditCardFormatCustom}
                  />
                  <div className="ErrorMessage">{this.state.payErrorText}</div>
                </FormControl>
                <FormControl style={{ width: '100%' }}>
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
                <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary" disabled={!this.state.submitBtn}>
                  Submit
                </Button>
              </DialogActions>
              <NoticeBox
                open={this.state.openRegisterSucc}
                onClose={this.handleCloseRegisterSucc}
                aria-labelledby="form-dialog-title"
                title="Register Successfully"
                content="You have register successfully. Please Login to start!" />
            </form>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}
export default CoorperatePage;