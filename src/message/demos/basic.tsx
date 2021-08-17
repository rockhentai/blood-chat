import React from 'react';
import { Message } from 'blood-chat';

const t = new Date().getTime();

export default () => (
  <div>
    <Message data="林水游最帅！" />
    <Message data="那必须的！" position="right" />
    <Message data="嘿嘿嘿" timestamp={t} />
    <Message data="血滴子" timestamp={t} position="right" />
  </div>
);
