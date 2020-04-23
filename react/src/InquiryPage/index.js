import React from 'react';
import Cookies from 'js-cookie';
import { Paper, Grid, Button, Input } from '@material-ui/core';
import axios from "axios";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import './inquiry.css'
import io from 'socket.io-client'
import { Scrollbars } from 'react-custom-scrollbars';

class InquiryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inRoom: false,
            messageList: [],
            newMessage: '',
            emptyRoomList:[],
            customerName:'',
        };
        this.socket = io(process.env.REACT_APP_API_URL)
    }

    componentWillMount() {
        this.socket.on('saved_dialog', (data) => {
            console.log(data);
            console.log('test');
            this.setState({
                messageList: [...this.state.messageList, data]
            })
        });
        
        this.socket.on('join_cs', (data) =>{
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
        let message={
            author: 'them',
            type: 'text',
            data: { text : this.state.newMessage }
        }
        this.socket.emit('chat_dialog', message, (error) => {
            console.log(error)
        })
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

    clickInRoom = (roomName) => {
        this.socket.emit('csinfo', { customer_room: roomName, cs_name: Cookies.get('username') }, (error) => {
            console.log(error)
        });
        this.setState({inRoom: true, customerName: roomName})
    }

    handleValueChange = prop => event =>{
        this.setState({[prop]: event.target.value});
    }

    render() {
        const username = Cookies.get("username");
        const accessRight = Cookies.get("accessRight");
        if (accessRight != 3 || this.state.redirect) {
            return <Redirect to="/" />
        }

        if (!this.state.getData) {
            this.getRoomListData();
            this.state.getData = true;
        }
        console.log(this.socket);
        return (
            <React.Fragment>
                <Paper className="profileContainer">
                    
                    {!this.state.inRoom &&
                        <div className="profileForm">
                            <h1>Inquiry Waiting List</h1>
                            <Scrollbars style={{ height: 800 }}>
                                <Button onClick={() => this.clickInRoom('annowo')}>hahaha</Button>
                            </Scrollbars>
                        </div>
                    }
                    {this.state.inRoom &&
                        <div className="profileForm">
                            <h1>{this.state.customerName}</h1>
                            <Scrollbars style={{ height: 800 }}>
                            {this.state.messageList.map((message)=> 
                                <Grid className={message.author == 'me'? 'leftBubble': 'rightBubble'}>
                                    {message.author == 'me' ? this.state.customerName: 'me'}:{message.data.text}
                                </Grid>
                            )}    
                                <Input value={this.state.newMessage} onChange={this.handleValueChange('newMessage')}/>
                                <Button onClick={this._onMessageWasSent}>send</Button>
                            </Scrollbars>
                        </div>
                    }

                </Paper>
            </React.Fragment>
        );
    }
}

export default InquiryPage;
