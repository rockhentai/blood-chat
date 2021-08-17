import React from 'react';
import { Message } from 'blood-chat';

const handleClick = (messageProps: any) => {
  console.log(messageProps);
};

export default () => (
  <div>
    <Message data="发送中~~" sendStatus={1} />
    <Message
      data="发送失败啦！"
      sendStatus={2}
      onErrorIconClick={handleClick}
    />
    <Message data="发送中~~" sendStatus={1} position="right" />
    <Message
      data="又失败啦！"
      sendStatus={2}
      position="right"
      onErrorIconClick={handleClick}
    />
  </div>
);
