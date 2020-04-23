import React from 'react';
import Cookies from 'js-cookie';
import { Paper, Grid, Button, Input, Card, CardHeader, IconButton } from '@material-ui/core';
import axios from "axios";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import './inquiry.css'
import io from 'socket.io-client'
import SendIcon from '@material-ui/icons/Send';
import { Scrollbars } from 'react-custom-scrollbars';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class InquiryPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            inRoom: false,
            messageList: [],
            newMessage: '',
            emptyRoomList: [],
            customerName: '',
            getData: false,
            mounted: false,
        };
        this.msgsScrollbars = React.createRef();
        this.scrollbars = React.createRef();
        this.socket = io(process.env.REACT_APP_API_URL)
    }
    componentDidMount() {
        this.setState({ mounted: true });
    }

    componentDidUpdate() {
        if (this.state.inRoom)
            this.state.mounted && this.scrollbars.current.scrollToBottom();
    }
    componentWillMount() {
        this.socket.on('saved_dialog', (data) => {
            console.log(data);
            console.log('test');
            this.setState({
                messageList: [...this.state.messageList, data]
            })
        });
        this.socket.on('join_cs', (data) => {
            console.log(data);
            console.log(data.dialog.split(',')[0])
            let message = {
                author: 'me',
                type: 'text',
                data: {
                    text: data.dialog
                }
            }
            this.setState({
                messageList: [...this.state.messageList, message]
            })
        })

    }

    _onMessageWasSent = () => {
        console.log(this.state.newMessage);
        let message = {
            author: 'them',
            type: 'text',
            data: { text: this.state.newMessage }
        }
        this.socket.emit('chat_dialog', message, (error) => {
            console.log(error)
        })
        this.setState({ newMessage: '' })
    }

    getRoomListData = async () => {
        axios.defaults.withCredentials = true
        let getDataUrl = `${process.env.REACT_APP_API_URL}/catalog/inquires/empty_room`
        axios.post(getDataUrl).then(result => {
            let data = result.data.empty_room
            console.log(result);
            this.setState({ emptyRoomList: data })
        })
    }
    exitRoom = () => {
        this.setState({
            inRoom: false,
            messageList: [],
            newMessage: '',
            emptyRoomList: [],
            customerName: '',
            getData: false
        })
    }
    clickInRoom = (roomName) => {
        this.socket.emit('csinfo', { customer_room: roomName, cs_name: Cookies.get('username') }, (error) => {
            console.log(error)
        });
        this.setState({ inRoom: true, customerName: roomName })
    }

    handleValueChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }
    render() {
        const username = Cookies.get("username");
        const accessRight = Cookies.get("accessRight");
        if (accessRight != 3 || this.state.redirect) {
            return <Redirect to="/" />
        }

        if (!this.state.getData) {
            // this.getRoomListData();
            this.state.getData = true;
        }
        console.log(this.socket);
        return (
            <React.Fragment>
                <Paper className="profileContainer">

                    {!this.state.inRoom &&
                        <div className="profileForm">
                            <h1 style={{ textAlign: "center" }}>Inquiry Waiting List</h1>
                            <Scrollbars style={{ height: 500 }}>
                                <Paper variant="outlined" style={{ margin: '1rem 0' }}>
                                    <Grid container direction="column" alignItems="center" style={{ margin: '1rem 0' }}>
                                        <Grid item xs={6} style={{ marginBottom: '1rem' }}><h2>RoomName</h2></Grid>
                                        <Grid item xs={6}>
                                            <Button size="large" variant="outlined" color="primary" onClick={() => this.clickInRoom('annowo')}>Join</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Scrollbars>
                        </div>
                    }
                    {this.state.inRoom &&
                        <div className="profileForm">
                            <Grid container justify="center" alignItems="center" style={{ marginBottom: '1rem' }}>
                                <Grid item><h1 style={{ textAlign: "center" }}>Inquiry Chat</h1></Grid>
                                <Grid item><IconButton onClick={this.exitRoom}><ExitToAppIcon style={{ fontSize: '1.5em' }} /></IconButton></Grid>
                            </Grid>
                            <Card style={{ width: '500px', margin: 'auto' }}>
                                <CardHeader
                                    title={'Customer: ' + this.state.customerName}
                                    style={{ backgroundColor: '#4e8cff', textAlign: 'center' }}
                                />
                                <Scrollbars style={{ height: 400 }} ref={this.scrollbars}>
                                    <Grid container item>
                                        {this.state.messageList.map((message, index) =>
                                            <Grid container key={index} justify={message.author == 'me' ? 'flex-start' : 'flex-end'}>
                                                <Grid item xs={6} className={message.author == 'me' ? 'bubble leftBubble' : 'bubble rightBubble'}>
                                                    {message.data.text}
                                                </Grid>
                                            </Grid>
                                        )}
                                        {/*<Grid container justify="flex-end">
                                            <Grid item xs={6} className='bubble rightBubble'>
                                                123456
                                            </Grid>
                                        </Grid>*/}
                                    </Grid>
                                </Scrollbars>
                                <Grid item container style={{ bottom: '0', backgroundColor: '#f4f7f9', width: '100%', padding: "1rem" }}>
                                    <Grid item xs={11}>
                                        <Input 
                                            style={{ width: '100%' }} 
                                            value={this.state.newMessage} 
                                            onChange={this.handleValueChange('newMessage')} 
                                            onKeyUp={(event) => { if (event.key == 'Enter') this._onMessageWasSent();}} 
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton onClick={this._onMessageWasSent}>
                                            <SendIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    }

                </Paper>
            </React.Fragment>
        );
    }
}

export default InquiryPage;
