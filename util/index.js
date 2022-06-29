export const dateFormateStr = {
  /** 标准日期格式：yyyy-MM-dd */
  normDatePattern: 'yyyy-MM-dd',
  /** 标准时间格式：hh:mm:ss */
  normTimePattern: 'HH:mm:ss',
  /** 标准日期时间格式，精确到分：yyyy-MM-dd HH:mm */
  normDatetimeMinutePattern: 'yyyy-MM-dd HH:mm',
  /** 标准日期时间格式，精确到秒：yyyy-MM-dd HH:mm:ss */
  normDatetimePattern: 'yyyy-MM-dd HH:mm:ss',
  /** 标准日期时间格式，精确到毫秒：yyyy-MM-dd HH:mm:ss.SSS */
  normDatetimeMsPattern: 'yyyy-MM-dd HH:mm:ss.SSS',
  /** 标准日期格式：yyyy年MM月dd日 */
  chineseDatePattern: 'yyyy年MM月dd日',
  /** 标准日期格式：yyyyMMdd */
  pureDatePattern: 'yyyyMMdd',
  /** 标准日期格式：HHmmss */
  pureTimePattern: 'HHmmss',
  /** 标准日期格式：yyyyMMddHHmmss */
  pureDatetimePattern: 'yyyyMMddHHmmss',
  /** 标准日期格式：yyyyMMddHHmmssSSS */
  pureDatetimeMsPattern: 'yyyyMMddHHmmssSSS',
};

/*
* 日期格式化
* */
export const dateFormat = (date, f) => {
  let fmt = f;
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(o).map((k, item) => {
    const exg = `(${k})`;
    if (new RegExp(exg).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
    return item;
  });
  return fmt;
}