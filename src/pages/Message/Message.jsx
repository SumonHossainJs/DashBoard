import React from 'react';
import "./Message.scss";
import List from "../../components/Message-comp/list/List";
import Chat from "../../components/Message-comp/chat/Chat";
import Detail from "../../components/Message-comp/detail/Detail";

const Message = () => {
  return (
    <div className='m-body'>
        <div className="m-container">
        <List />
         <Chat />
         <Detail />
        </div>
    </div>
  )
}

export default Message