import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <Scrollbars className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </Scrollbars>
);

export default Messages;