import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { Grid, Button, Paper, Input } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import NumberFormat from 'react-number-format';
import NoticeBox from '../components/NoticeBox';
import CreditCards from 'react-credit-cards';
import './payment.css';
import 'react-credit-cards/es/styles-compiled.css';

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

function ExpiryFormatCustom(props) {
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
            format="##/##"
        />
    );
}

ExpiryFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

function cvcFormatCustom(props) {
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
            format="###"
        />
    );
}

cvcFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            order: '',
            userInfo: '',
            notGetList: true,
            cvc: '',
            expiry: '',
            focused: '',
            name: '',
            number: '',
            issuer: '',
            cvcError: false,
            expiryError: false,
            nameError: false,
            numberError: false,
            formData: null,
            paySuccBox: false
        }
        this.handleInputFocus = this.handleInputFocus.bind(this);
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer: true });
        }
    };
    handlePaySuccBox= ()=>{
        this.setState({paySuccBox: false, redirect: true});
    }
    handleInputFocus = id => {
        this.setState({
            focused: id,
        });
    };

    handleInputChange = prop => ({ target }) => {
        if (prop === 'number') {
            if (target.value.length != 16) {
                this.setState({ numberError: true })
            } else {
                this.setState({ numberError: false })
            }
        } else if (prop === 'expiry') {
            if (target.value.length != 4) {
                this.setState({ expiryError: true })
            } else {
                this.setState({ expiryError: false })
            }
        } else if (prop === 'cvc') {
            if (target.value.length != 3) {
                this.setState({ cvcError: true })
            } else {
                this.setState({ cvcError: false })
            }
        } else if (prop === 'name') {
            if (target.value.length == 0) {
                this.setState({ nameError: true })
            } else {
                this.setState({ nameError: false })
            }
        }
        console.log(target)
        this.setState({ [prop]: target.value });
    };

    getOrder = async (id) => {
        axios.defaults.withCredentials = true
        let getOrderUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/find_order_by_id`
        let data = { id: id };
        axios.post(getOrderUrl, data).then(result => {
            console.log(result.data);
            if (result.data.process == "failed") {
                this.setState({ redirectError: true })
            } else {
                this.setState({ order: result.data.orderDetails })
            }
            return result;
        })
    }
    getUserInfo = async () => {
        axios.defaults.withCredentials = true
        let getOrderUrl = `${process.env.REACT_APP_API_URL}/catalog/customers/user_data`
        axios.post(getOrderUrl).then(result => {
            console.log(result.data);
            if (result.data.process == "failed") {
                this.setState({ redirectError: true })
            } else {
                this.setState({ userInfo: result.data.customerData, number: result.data.customerData.paymentInfo, name: result.data.customerData.name })
            }
            return result;
        })
    }
    calculateTotal = (list) => {
        let i = 0;
        let sum = 0;
        while (list[i]) {
            sum = sum + list[i].price * list[i].amount
            i++;
        }
        return sum;
    }

    changeStatus = async () => {
        axios.defaults.withCredentials = true
        const data = { _id: this.props.match.params.orderid, orderStatus: 1 };
        let getOrderListUrl = `${process.env.REACT_APP_API_URL}/catalog/orders/update_order`
        axios.post(getOrderListUrl, data).then(result => {
            console.log(result)
            this.setState({paySuccBox: true})
        })
    }
    
    render() {
        const accessRight = Cookies.get("accessRight");
        if (this.state.notGetList) {
            console.log(this.props.match.params.orderid);
            this.getOrder(this.props.match.params.orderid);
            this.getUserInfo();
            this.state.notGetList = false
        }
        if (accessRight != 0 || this.state.redirect) {
            return <Redirect to="/" />
        }
        const { name, number, expiry, cvc, focused, issuer, formData, cvcError, nameError, numberError, expiryError } = this.state;
        var payError = true;
        if (cvcError || nameError || numberError || expiryError) {
            payError = true;
        } else if (cvc && name && number && expiry) {
            payError = false;
        }
        var total = 0;
        if (this.state.order) {
            total = this.calculateTotal(this.state.order.orderList);
        }
        return (
            <React.Fragment>
                <Paper className="paymentContainer">
                    <div className="paymentList">
                        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>PaymentPage</h1>
                        <h2 style={{ textAlign: 'center' }} >Order Details</h2>
                        <Grid container style={{ marginTop: '1rem' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={2} style={{ fontSize: '1.5rem' }}>Name: </Grid>
                                <Grid item xs={4} style={{ textAlign: 'right', fontSize: '1.5rem' }}>{this.state.userInfo.name}</Grid>
                                <Grid item xs={2} style={{ fontSize: '1.5rem' }}>Mobile: </Grid>
                                <Grid item xs={4} style={{ textAlign: 'right', fontSize: '1.5rem' }}>{this.state.userInfo.mobile}</Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={2} style={{ fontSize: '1.5rem' }}>Address:</Grid>
                                <Grid item xs={10} style={{ textAlign: 'right', fontSize: '1.5rem' }}>{this.state.userInfo.address}</Grid>
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: '1.5rem' }}>OrderList:</Grid>
                            <Grid container style={{ borderTop: 'solid 1px black', borderBottom: 'solid 1px black' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} style={{ textAlign: 'left', fontSize: '1.3rem' }}>Dish</Grid>
                                    <Grid item xs={3} style={{ textAlign: 'center', fontSize: '1.3rem' }}>Amount</Grid>
                                    <Grid item xs={3} style={{ textAlign: 'right', fontSize: '1.3rem' }}>Price</Grid>
                                </Grid>
                                {this.state.order && this.state.order.orderList.map((item, index) =>
                                    <Grid container spacing={3} key="index">
                                        <Grid item style={{ textAlign: 'left', fontSize: '1.2rem' }} xs={6}>{item.dish}</Grid>
                                        <Grid item style={{ textAlign: 'center', fontSize: '1.2rem' }} xs={3}>{item.amount}</Grid>
                                        <Grid item style={{ textAlign: 'right', fontSize: '1.2rem' }} xs={3}>HK${item.price}</Grid>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container spacing={3} >
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2} style={{ fontSize: '1.2rem' }}>Subtotal:</Grid>
                                <Grid item xs={2} style={{ textAlign: 'right', fontSize: '1.2rem' }}>HK${total}</Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2} style={{ fontSize: '1.2rem' }}>Delievery:</Grid>
                                <Grid item xs={2} style={{ textAlign: 'right', fontSize: '1.2rem' }}>HK$20</Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2} style={{ fontSize: '1.5rem' }}>Total:</Grid>
                                <Grid item xs={2} style={{ textAlign: 'right', fontSize: '1.5rem' }}>HK${total + 20}</Grid>
                            </Grid>
                        </Grid>
                        <hr style={{ margin: '1rem 0' }} />
                        <Grid id="PaymentForm">
                            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }} >Credit Card Details</h2>
                            <Grid container key="Payment" spacing={3}>
                                <Grid item xs={6} className="App-payment">
                                    <CreditCards
                                        number={number}
                                        name={name}
                                        expiry={expiry}
                                        cvc={cvc}
                                        focused={focused}
                                        callback={this.handleCallback}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <Input
                                                style={{ width: '100%' }}
                                                type="tel"
                                                className="form-control"
                                                placeholder="Card Number"
                                                pattern="[\d| ]{16,22}"
                                                value={number}
                                                required
                                                error={numberError}
                                                inputComponent={CreditCardFormatCustom}
                                                onChange={this.handleInputChange('number')}
                                                onFocus={() => this.handleInputFocus('number')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={name}
                                                required
                                                error={nameError}
                                                onChange={this.handleInputChange('name')}
                                                onFocus={() => this.handleInputFocus('name')}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <Input
                                                    style={{ width: '100%' }}
                                                    type="tel"
                                                    name="expiry"
                                                    className="form-control"
                                                    placeholder="Valid Thru"
                                                    pattern="\d\d/\d\d"
                                                    value={expiry}
                                                    required

                                                    error={expiryError}
                                                    inputComponent={ExpiryFormatCustom}
                                                    onChange={this.handleInputChange('expiry')}
                                                    onFocus={() => this.handleInputFocus('expiry')}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <Input
                                                    style={{ width: '100%' }}
                                                    type="tel"
                                                    name="cvc"
                                                    className="form-control"
                                                    placeholder="CVC"
                                                    pattern="\d{3,4}"
                                                    value={cvc}
                                                    required
                                                    error={cvcError}
                                                    inputComponent={cvcFormatCustom}
                                                    onChange={this.handleInputChange('cvc')}
                                                    onFocus={() => this.handleInputFocus('cvc')}
                                                />
                                            </div>
                                        </div>
                                        <input type="hidden" name="issuer" value={issuer} />
                                        <div className="form-actions">
                                            <Button size="large" variant="outlined" color="secondary" style={{ width: '100%', marginTop: '1rem' }} disabled={payError} onClick={this.changeStatus}>PAY</Button>
                                        </div>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <NoticeBox
                    open={this.state.paySuccBox}
                    onClose={this.handlePaySuccBox}
                    aria-labelledby="form-dialog-title"
                    title="Payment Successfully"
                    content="You have pay successfully. Please wait and enjor!" />
            </React.Fragment >
        );
    }
}

export default withRouter(PaymentPage);
