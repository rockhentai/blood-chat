import React from 'react';
import { Message } from 'blood-chat';
// import { MessageTypes } from 'blood-chat/message';

const RTF =
  '<p>十块钱的电纸手表和一百万的劳力士，时间都是一样转的</p><p><img src="https://lilith-psp-oss-cn.oss-cn-shanghai.aliyuncs.com/test/1627379145997b0190d8e90fdb475c42817b11b54b131.gif"></p><p><br></p><ul><li>药水哥</li></ul>';
const IMAGE =
  'https://lilith-psp-oss-cn.oss-cn-shanghai.aliyuncs.com/test/1628737884934file';
const VIDEO =
  'https://lilith-psp-oss-cn.oss-cn-shanghai.aliyuncs.com/test/1628837264630v0200fbf0000bhbt3nqkr6g1d35cdbs0.MP4';

export default () => (
  <div>
    <Message data={RTF} type={2} />
    <Message data={VIDEO} position="right" type={5} />
    <Message data={IMAGE} type={3} />
  </div>
);
