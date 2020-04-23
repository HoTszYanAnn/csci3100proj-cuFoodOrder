import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messageList: [],
            newMessage: '',
            isOpen : false
        }
        
        this.socket = io(process.env.REACT_APP_API_URL)
    }
    componentWillMount() {
        this.socket.on('saved_dialog', (data) => {
            console.log(data);
            this.setState({
                messageList: [...this.state.messageList, data]
            })
        });

        this.socket.on('join_cust', (data) =>{
            console.log(data);
            let message = {
                author: 'them',
                type: 'text',
                data: {
                  text: data.dialog
                }
              }
            this.setState({
                messageList: [...this.state.messageList, message]
            })
        })
        this.socket.on('join_cs', (data) =>{
            console.log(data);
            let message = {
                author: 'them',
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
    
    joinRoom = () => {
        console.log('clicked')
        if (!this.state.isOpen){
            this.socket.emit('userinfo', { customer_room: Cookies.get('username') }, (error) => {
                console.log(error)
            });
        }else{
            this.setState({messageList: []})
        }
        this.setState({isOpen: !this.state.isOpen})
        
    }

    _onMessageWasSent(message) {
        console.log(message);
        this.socket.emit('chat_dialog', message, (error) =>{
            console.log(error)
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    render() {
        return (
        <div>
            <Launcher
                agentProfile={{
                    teamName: 'CU Food Order Customer Service',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji
                isOpen={this.state.isOpen}
                handleClick={this.joinRoom}
            />

        </div>)
    }
}

export default Chat;