import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import io from "socket.io-client";


class ChatBox extends Component {

    constructor() {
        super();
        this.state = {
            messageList: []
        };
        this.socket = io('localhost:3000');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            __receivedMessage(data);
            console.log('received');
        this.socket.on('error', function (err) {
            console.log(err);
        });
        })
        
        const __receivedMessage = message => {
            this.setState({
                messageList: [...this.state.messageList, message]
            })
            console.log('received');
            console.log(this.socket.id);
        }

        this._onMessageWasSent = message => {
            this.setState({
                messageList: [...this.state.messageList, message]
            })
            this.socket.emit('SEND_MESSAGE', message);
            console.log('sent');
            console.log(this.socket.id);
        }

        this._sendMessage = text => {
            if (text.length > 0) {
                this.setState({
                    messageList: [...this.state.messageList, {
                        author: 'them',
                        type: 'text',
                        data: { text }
                    }]
                })
                console.log('sent');
                console.log(this.socket.id);
            }
        }
    }

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'react-chat-window',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji
            />
        </div>)
    }
}

export default ChatBox;