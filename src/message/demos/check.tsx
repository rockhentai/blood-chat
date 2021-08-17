import React from 'react';
import { Message } from 'blood-chat';

export default () => (
  <div>
    <Message data="林水游最帅！" checked={true} />
    <Message data="嘿嘿嘿" position="right" checked={false} />
    <Message data="哈哈哈" checked={1} />
    <Message data="checked为0" checked={0} />
    <Message data="血滴子" position="right" checked={10} />
  </div>
);
