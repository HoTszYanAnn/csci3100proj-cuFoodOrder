import React from 'react';
import Cookies from 'js-cookie';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import NoticeBox from '../components/NoticeBox';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import './profile.css'


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

class ProfilePage extends React.Component {
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
            introduction: '',
            introError: '',
            introErrorText: '',
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
            showPassword: false,
            openRegisterSucc: false,
            redirect: false,
            getData: false,
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
            if (event.target.value.length < 8 && event.target.value.length != 0)
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
        console.log(prop +'.'+'event.target.value')
        this.setState({ [prop]: event.target.value })
    };

    handleCloseRegisterSucc = () => {
        this.setState({ openRegisterSucc: false })
        this.state.redirect = true;
    };
    handleOpenRegisterSucc = () => {
        this.setState({ openRegisterSucc: true })
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    SubmitLoginBox = () => {
        var data = this.UpdateRequest();
        this.handleOpenRegisterSucc();
    };

    UpdateRequest = async () => {
        axios.defaults.withCredentials = true
        let data = null;
        if (this.state.password) {
            data = { username: this.state.username, name: this.state.name , password : this.state.password, address : this.state.address, mobile : this.state.mobile, emailAddress: this.state.email, paymentInfo : this.state.payment, introduction: this.state.introduction};
        } else {
            data = { username: this.state.username, name: this.state.name , address : this.state.address, mobile : this.state.mobile, emailAddress: this.state.email, paymentInfo : this.state.payment, introduction: this.state.introduction};
        }
        let updateUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/update_account`
        axios.post(updateUrl, data).then(result => {
            console.log(result);
        })
    }
    getUserData = async (input) => {
        axios.defaults.withCredentials = true
        let getDataUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/user_data`
        axios.post(getDataUrl).then(result => {
            let data = result.data.customerData
            console.log(result);
            this.setState({ name: data.name, username: data.username, address: data.address, mobile: data.mobile, email: data.emailAddress, payment: data.paymentInfo, introduction:data.introduction })
        })
    }


    render() {
        const username = Cookies.get("username");
        const accessRight = Cookies.get("accessRight");
        if (!accessRight || this.state.redirect) {
            return <Redirect to="/" />
        }

        if (!this.state.getData) {
            this.getUserData(username);
            this.state.getData = true;
        }

        if (!(this.state.addError) && !(this.state.emailError) && !(this.state.nameError) && !(this.state.unError) && !(this.state.mobileError) && !(this.state.payError) && !(this.state.pwError))
            if (this.state.username && this.state.address && this.state.email && this.state.mobile && this.state.name && this.state.payment) {
                this.state.submitBtn = true;
            }
            else {
                console.log('empty');
                this.state.submitBtn = false;
            }
        else
            this.state.submitBtn = false;
        return (
            <React.Fragment>
                <Paper className="profileContainer">
                    <div className="profileForm">
                        <h1>Update Profile</h1>
                        <h4>*Keep password field empty if you do not want to edit password.</h4>
                        <h4>*The username cannot be edited.</h4>
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
                                        disabled
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
                                    <InputLabel htmlFor="outlined-adornment-username">Mobile</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-username"
                                        value={this.state.mobile}
                                        onChange={this.handleChangeRegister('mobile')}
                                        inputComponent={PhoneNumberFormatCustom}
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
                                {accessRight == 1 &&
                                <FormControl variant="outlined"
                                    margin="dense" fullWidth error={this.state.introError}>
                                    <InputLabel htmlFor="outlined-adornment-username">Introduction</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-username"
                                        value={this.state.introduction}
                                        onChange={this.handleChangeRegister('introduction')}
                                        labelWidth={70}
                                    />
                                    <div className="ErrorMessage">{this.state.introErrorText}</div>
                                </FormControl>
                                }
                            </DialogContent>
                            <DialogActions>
                                <div style={{ flex: '1 0 0' }} />
                                <Button variant="outlined" color="secondary" component={RouterLink} to="/">
                                    Back
                                </Button>
                                <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary" disabled={!this.state.submitBtn}>
                                    Update
                                </Button>
                            </DialogActions>
                            <NoticeBox
                                open={this.state.openRegisterSucc}
                                onClose={this.handleCloseRegisterSucc}
                                aria-labelledby="form-dialog-title"
                                title="Update Successfully"
                                content="You have update successfully." />
                        </form>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default ProfilePage;
