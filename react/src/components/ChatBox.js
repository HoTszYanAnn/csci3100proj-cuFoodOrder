import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import io from "socket.io-client";
import { Fab } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

class ChatBox extends Component {

    

    render() {
        return (
        <div>
            <Fab color="primary" aria-label="add">
                <ChatIcon />
            </Fab>
        </div>)
    }
}

export default ChatBox;