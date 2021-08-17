import moment from 'moment';
import padStart from 'lodash/padStart';
// import HtmlToReact, { Parser } from 'html-to-react';

// const htmlToReactParser = new Parser();
// const processDefaultNode = new HtmlToReact.ProcessNodeDefinitions().processDefaultNode;

const timeUnits: [string, number][] = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

const DEFAULT_FORMAT = 'H时m分s秒';
const MINUTE_1 = 60 * 1000;
const MINUTE_5 = 5 * MINUTE_1;
const HOUR_1 = 60 * MINUTE_1;
const DAY_1 = 24 * HOUR_1;

export function formatTimeDuration(
  duration: number,
  format: string = DEFAULT_FORMAT,
) {
  let leftDuration: number = duration;

  const escapeRegex = /\[[^\]]*]/g;
  const keepList: string[] = (format.match(escapeRegex) || []).map((str) =>
    str.slice(1, -1),
  );
  const templateText = format.replace(escapeRegex, '[]');

  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    if (current.indexOf(name) !== -1) {
      const value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
        const len = match.length;
        return padStart(value.toString(), len, '0');
      });
    }
    return current;
  }, templateText);

  let index = 0;
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index];
    index += 1;
    return match;
  });
}

export const getMomentTime = (
  timestamp: number,
  noMoment?: boolean,
): string => {
  const momentTime = moment(timestamp);

  const timeAgo = +new Date() - timestamp;
  const todayStart = parseInt(
    moment(`${moment().format('YYYYMMDD')}00:00:00`, 'YYYYMMDDHH:mm:ss').format(
      'x',
    ),
    10,
  );
  const tomorrowStart = todayStart + DAY_1;
  const yesterdayStart = todayStart - DAY_1;
  const beforeYesterdayStart = yesterdayStart - DAY_1;
  const weekStart = tomorrowStart - moment().day();
  const yearStart = parseInt(
    moment(`${moment().format('YYYY')}0101`, 'YYYYMMDD').format('x'),
    10,
  );

  // 消息时间小于5分钟
  if (timeAgo < MINUTE_5 && !noMoment) {
    return '刚刚';
  }

  // 消息时间为今天
  if (timestamp >= todayStart && timestamp < tomorrowStart) {
    return `今天 ${momentTime.format('HH:mm')}`;
  }

  // 消息时间为昨天
  if (timestamp >= yesterdayStart && timestamp < todayStart) {
    return `昨天 ${momentTime.format('HH:mm')}`;
  }

  // 消息时间为前天
  if (timestamp >= beforeYesterdayStart && timestamp < yesterdayStart) {
    return `前天 ${momentTime.format('HH:mm')}`;
  }

  // 消息时间为一周内
  if (timestamp >= weekStart) {
    const weeksCN = ['一', '二', '三', '四', '五', '六', '日'];
    const weekIndex = momentTime.day();
    return `星期${weeksCN[weekIndex]} ${momentTime.format('HH:mm')}`;
  }

  // 消息时间为一年内
  if (timestamp >= yearStart) {
    return momentTime.format('M月D日 HH:mm');
  }

  // 消息时间超过一年
  return momentTime.format('YYYY年M月D日 HH:mm');
};

export const insertString = (
  source: string,
  start: number,
  section: string,
): string => source.slice(0, start) + section + source.slice(start);
