---
nav:
  title: Components
  path: /components
---

## Message - 消息气泡

聊天场景中最基本的组成元素，展示消息内容。

### 基本使用

`position` 支持左右位置排列，`timestamp` 设置消息时间戳

<code src="./demos/basic.tsx" title="基本使用" />

### 头像

可设置头像

<code src="./demos/avatar.tsx" title="头像" />

### 消息类型

设置 `type` 来支持不同的消息类型，目前有纯文本、富文本、图片、视频等消息类型

<code src="./demos/types.tsx" title="消息类型" />

### 已读/未读

`checked` 用于标注消息的已读、未读状态，支持 `number` 和 `boolean`，默认不展示。

<code src="./demos/check.tsx" title="已读/未读" />

### 消息状态

消息会有发送成功、loading、失败状态，`sendStatus` 会覆盖 `已读/未读` 状态

<code src="./demos/status.tsx" title="消息状态" />

## API

### MessageProps

| 参数             | 说明                                               | 类型                              | 默认值 |
| ---------------- | -------------------------------------------------- | --------------------------------- | ------ |
| uuid             | 消息唯一 id                                        | `string`                          | -      |
| data             | 消息内容，视频和图片消息的 `data` 值为资源链接地址 | `string`                          | -      |
| position         | 消息排列位置                                       | `left \| right`                   | `left` |
| timestamp        | 时间戳，默认不显示                                 | `number`                          | -      |
| checked          | 已读/未读                                          | `boolean \| number`               | -      |
| type             | 消息类型                                           | [MessageTypes](#MessageTypes)     | 1      |
| avatar           | 头像                                               | `string`                          | -      |
| sendStatus       | 消息发送状态                                       | [SendStatus](#SendStatus)         | -      |
| onErrorIconClick | 发送失败 icon 点击事件                             | `(message: MessageProps) => void` | -      |

### MessageTypes

```tsx | pure
enum MessageTypes {
  UNKNOWN_IMCONTENTTYPE = 0,
  /** MESSAGE - 聊天文字消息 */
  MESSAGE = 1,
  /** RTF - 富文本 */
  RTF = 2,
  /** IMAGE - 图片 */
  IMAGE = 3,
  /** VIDEO - 视频(非实时) */
  VIDEO = 5,

  UNRECOGNIZED = -1,
}
```

### SendStatus

```tsx | pure
enum SendStatus {
  SUCCESS = 0,
  SENDING = 1,
  TIMEOUT_OR_SERVER_ERROR = 2,
}
```
