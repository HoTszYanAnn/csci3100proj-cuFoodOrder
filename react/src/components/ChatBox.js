import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import io from "socket.io-client";
import { Fab } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { withTheme } from '@material-ui/core/styles';
import Chat from './Chat/Chat/Chat'

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
        return (
            <div>
               {/*} <Fab color="primary" aria-label="add" style={{
                    position: 'fixed',
                    bottom: this.props.theme.spacing(5),
                    right: this.props.theme.spacing(5),
                }}>
                    <ChatIcon onClick={this.openChat}/>
            </Fab>*/}
                <Chat open={this.state.chatOpen} onClose={this.handleCloseChat}/>
            </div>
            )
    }
}

export default withTheme(ChatBox);