import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { Avatar, Image, Tooltip } from 'antd';
import {
  LoadingOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { getMomentTime } from '../utils/utils';
import { WithFalse } from '../utils/type';
import { ConfigContext } from '../config-provider';

import './Message.less';

export interface MessageDataType {}

export enum MessageTypes {
  UNKNOWN_IMCONTENTTYPE = 0,
  /** MESSAGE - 聊天文字消息 */
  MESSAGE = 1,
  /** RTF - 富文本 */
  RTF = 2,
  /** IMAGE - 图片 */
  IMAGE = 3,
  /** AUDIO - 语音(非实时) */
  AUDIO = 4,
  /** VIDEO - 视频(非实时) */
  VIDEO = 5,

  UNRECOGNIZED = -1,
}

export enum SendStatus {
  SUCCESS = 0,
  SENDING = 1,
  TIMEOUT_OR_SERVER_ERROR = 2,
}

export interface MessageProps {
  uuid?: string;
  className?: string;
  prefixCls?: string;
  position?: 'left' | 'right';
  data: string;
  checked?: number | boolean;
  avatar?: WithFalse<string>;
  type?: MessageTypes;
  timestamp?: number;
  sendStatus?: SendStatus;
  onErrorIconClick?: (messageProps: MessageProps) => void;
}

const renderMessageData = (
  data: string,
  type: MessageTypes = MessageTypes.MESSAGE,
) => {
  if (type === MessageTypes.IMAGE) {
    return <Image src={data} height={200} />;
  }
  if (type === MessageTypes.VIDEO) {
    return <video src={data} height={200} controls />;
  }
  if (type === MessageTypes.RTF) {
    return <div dangerouslySetInnerHTML={{ __html: data }} />;
  }
  return <span style={{ whiteSpace: 'pre-wrap' }}>{data}</span>;
};

const renderCheckedIcon = (checked?: boolean | number) => {
  if (checked === true) {
    return <CheckCircleOutlined />;
  }
  const count = checked || '';
  return (
    <span className="check-wrapper">
      <span className="count">{count}</span>
    </span>
  );
};

const Message: React.FC<MessageProps> = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
    position = 'left',
    checked,
    avatar,
    data,
    type,
    timestamp,
    sendStatus,
    uuid,
    onErrorIconClick,
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const msgPrefixCls = getPrefixCls('message', customizePrefixCls);

  const handleErrorIconClick = useCallback(() => {
    if (onErrorIconClick) onErrorIconClick(props);
  }, [uuid]);

  return (
    <div className={classNames(msgPrefixCls, position, className)}>
      {avatar && (
        <div className={classNames(`${msgPrefixCls}-avatar`)}>
          <Avatar src={avatar} size={36} />
        </div>
      )}
      <div className={classNames(`${msgPrefixCls}-box`)}>
        <div className={classNames(`${msgPrefixCls}-box-wrapper`)}>
          {/* {showMessageActions && type === IMCONTENTTYPE.MESSAGE && (
            <div className={classNames(`${msgPrefixCls}-actions`)}>
              <Tooltip title="查找知识库">
                <div
                  className={`${msgPrefixCls}-actions-btn ${msgPrefixCls}-actions-search-btn`}
                  onClick={handleSearchClick}
                />
              </Tooltip>
            </div>
          )} */}
          {checked !== undefined && !sendStatus && (
            <div className={classNames(`${msgPrefixCls}-info-check`)}>
              {/* {checked ? '已读' : '未读'} */}
              {renderCheckedIcon(checked)}
            </div>
          )}
          {!!sendStatus && (
            <div className={classNames(`${msgPrefixCls}-info-status`)}>
              {sendStatus === SendStatus.SENDING && <LoadingOutlined />}
              {sendStatus === SendStatus.TIMEOUT_OR_SERVER_ERROR && (
                <ExclamationCircleOutlined
                  className={classNames(`${msgPrefixCls}-info-status-icon`)}
                  onClick={handleErrorIconClick}
                />
              )}
            </div>
          )}
          <div className={classNames(`${msgPrefixCls}-box-inner`)}>
            {renderMessageData(data, type)}
          </div>
        </div>
        {timestamp && (
          <div className={classNames(`${msgPrefixCls}-box-date`)}>
            {getMomentTime(timestamp, true)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
