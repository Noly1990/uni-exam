/**
 * 
 * @param {Date} date 
 */
export function dateToDayString(date){
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
}

/**
 * 把字符串秒时间转化成一个Date对象
 * @param {String} str 
 */
export function secondsStrToDate(str){
  let date = new Date();
  date.setTime(str+'000');
  return date;
}

export function date2SecondsStr(date){
  let fullStr = date.getTime().toString();
  var str = fullStr.substring(0,fullStr.length-3);
  return str;
}
export function secondsToDateString(str) {
  let date = secondsStrToDate(str);
  let year = date.getFullYear();
  let month =date.getMonth()+1;
  let monthStr = month>9?month:`0${month}`;
  let day = date.getDate();
  let dayStr = day>9?day:`0${day}`;
  let hour = date.getHours();
  let hourStr = hour>9?hour:`0${hour}`;
  let minute = date.getMinutes();
  let minuteStr = minute>9?minute:`0${minute}`;
  return `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}`;
}
 
 