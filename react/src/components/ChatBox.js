import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import io from "socket.io-client";
import { Fab } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { withTheme } from '@material-ui/core/styles';
import Chat from './Chat/Chat'
import Cookies from 'js-cookie';
class ChatBox extends Component {

    constructor(props){
        super(props);
        this.state ={
            chatOpen: false,
        }
        this.handleCloseChat = this.handleCloseChat.bind(this);
    }

    handleCloseChat = () =>{
        this.setState({chatOpen: false});
    }

    startInquire = async() =>{

    }
    openChat = () => {
        this.setState({chatOpen: true});
    }
    render() {
        let accessRight = Cookies.get('accessRight');
        let display = true
        if (accessRight == 3 || !accessRight){
            display = false
        }
        return (
            <div>
               {/*} <Fab color="primary" aria-label="add" style={{
                    position: 'fixed',
                    bottom: this.props.theme.spacing(5),
                    right: this.props.theme.spacing(5),
                }}>
                    <ChatIcon onClick={this.openChat}/>
            </Fab>*/}
                {display && <Chat open={this.state.chatOpen} onClose={this.handleCloseChat}/>}
            </div>
            )
    }
}

export default withTheme(ChatBox);