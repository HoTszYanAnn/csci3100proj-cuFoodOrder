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
import './css/RegisterBox.css';


class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            error_message: '',
            value: '',
            showPassword: false
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
        //setLoginValues({ ...this.state.loginValues, showPassword: !this.state.showPassword });
    };
    handleChangeLogin = prop => event => {
        //setLoginValues({ ...this.state.loginValues, [prop]: event.target.value });
        this.setState({ [prop]: event.target.value })
    };

    setErrorMessage = value => {
        this.setState({ error_message: value })
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    SubmitLoginBox = () => {
        var data = this.loginRequest();
    };
    loginRequest = async () => {
        const loginData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        try {
            const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/catalog/customers/login`, loginData);
            const data = await fetchResponse.json().then(function (a) {
                return a;
            });
            if (data.process == 'success') {
                this.setErrorMessage("");
                Cookies.set("token", data.customerId, { expires: 1 });
                Cookies.set("username", this.state.username, { expires: 1 });
                Cookies.set("accessRight", data.accessRight, { expires: 1 });
                this.props.onClose();
            } else {
                this.setErrorMessage(data.details);
            }
            return data;
        } catch (e) {
            return e;
        }
    }
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle id="form-dialog-title"><div className="navlogin-title">Login</div></DialogTitle>
                <form>
                    <DialogContent>

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
                        <div>{this.state.error_message}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onRegister} variant="outlined" color="primary">
                            Register
                    </Button>
                        <div style={{ flex: '1 0 0' }} />
                        <Button onClick={this.props.onClose} variant="outlined" color="secondary">
                            Cancel
                    </Button>
                        <Button onClick={this.SubmitLoginBox} variant="outlined" color="primary">
                            Login
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default LoginBox;
