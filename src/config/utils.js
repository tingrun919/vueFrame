import Vue from 'vue'

// 常用数组中取值
const fDict = (value, cArr) => {
  if (typeof value === 'number') {
    value = value + '';
  }
  if (fStrNotBlank) {
    const obj = cArr.find(x => x.value === value);
    if (obj != null) {
      return obj.label;
    }
  }
  return '';
}

// 判断字符串不为空
const fStrNotBlank = (value) => {
  if (value != null && value !== '') {
    return true;
  }
  return false;
}
// 判断数组不为空
const fArrNotBlank = (arr) => {
  if (arr != null && arr.length > 0) {
    return true;
  }
  return false;
}
// 判断对象不为空
const fObjNotBlank = (obj) => {
  if (obj != null && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
}
// 字符串过滤
const fTrim = (str, char) => {
  if (fStrNotBlank(str)) {

    if (char == null) {
      return str.replace(/\s+/g, '')
    } else {
      var reg = new RegExp(`${char}+`, 'g');
      return str.replace(reg, '')
    }
  }
  else {
    return '';
  }
}
// 字符串过滤 头
const fTrimStart = (str, char) => {
  if (fStrNotBlank(str)) {
    if (char == null) {
      return str.replace(/^\s+/, '')
    } else {
      var reg = new RegExp(`^${char}+`);
      return str.replace(reg, '')
    }
  }
  else {
    return '';
  }
}
// 字符串过滤 尾
const fTrimEnd = (str, char) => {
  if (fStrNotBlank(str)) {
    if (char == null) {
      return str.replace(/\s+$/, '')
    } else {
      var reg = new RegExp(`${char}+$`);
      return str.replace(reg, '')
    }
  } else {
    return '';
  }
}
//拼接字符串
const urlEncode = (param, key, encode) => {
  var paramStr = '';
  var t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr;
}

//#region  高尔夫
const getDateShow = (startTime) => {
  if (startTime == null) {
    return '';
  }

  return Vue.moment(startTime).format("YYYY-MM-DD");
}

// 赛事时间 比赛时间
const getDate = (startTime, endTime = null) => {
  if (startTime == null) {
    return '--';
  }
  if (endTime == null) {
    return Vue.moment(startTime).format("YYYY-MM-DD");
  }
  return Vue.moment(startTime).format("YYYY-MM-DD") + ' 至 ' + Vue.moment(endTime).format("YYYY-MM-DD");
}

const getTime = (startTime) => {
  if (startTime == null) {
    return '';
  }
  return Vue.moment(startTime).format("YYYY-MM-DD HH:mm:ss")
}

// 比赛阶段
const fieldNumberStr = (num) => {
  if (num == null) num = 0;
  return `第${num}场`;
}
// 比赛地点
const fieldAddress = (row, AG_OUT, AG_IN) => {
  AG_OUT = AG_OUT || [];
  AG_IN = AG_IN || [];
  let { fieldAddressCountry, fieldAddressProvince, fieldAddressCity, fieldAddressCounty, address } = row;
  let country = _.toString((AG_OUT.find(x => x.code === fieldAddressCountry) || { name: fieldAddressCountry }).name)
  let province = _.toString((AG_IN.find(x => x.code === fieldAddressProvince) || { name: fieldAddressProvince }).name)
  let city = _.toString((AG_IN.find(x => x.code === fieldAddressCity) || { name: fieldAddressCity }).name).replace('市辖区', '').replace('所属县', '')
  let county = _.toString((AG_IN.find(x => x.code === fieldAddressCounty) || { name: fieldAddressCounty }).name)
  if (fieldAddressCountry === 'A156') {
    return province + city + county;
  } else {
    return country + _.toString(address);
  }
}
// 居住地
const personAddress = (row, AG_OUT, AG_IN) => {
  AG_OUT = AG_OUT || [];
  AG_IN = AG_IN || [];
  let { liveProvince, liveCity, liveCounty, liveAddress } = row; 
  let province = _.toString((AG_IN.find(x => x.code === liveProvince) || { name: liveProvince }).name)
  let city = _.toString((AG_IN.find(x => x.code === liveCity) || { name: liveCity }).name).replace('市辖区', '').replace('所属县', '')
  let county = _.toString((AG_IN.find(x => x.code === liveCounty) || { name: liveCounty }).name)
  return province + city + county + _.toString(liveAddress);
}

// 选手名称
const userName = (userName, englishName) => {
  if (!userName) {
    return '';
  }
  if (!englishName) {
    return userName;
  }
  return userName + ' ' + englishName
}

const toStr = (str, end) => {
  if (str == null || str === '') {
    return '--';
  }
  if (end != null) {
    return str + '-' + end;
  }
  return str;
}
//
const toIntegral = (num) => {
  let str = _.toString(num);
  if (str === '') return ''
  if (str.indexOf('.') === -1) return str + '.0000';
  if (str.indexOf('.') > 0) return str + _.padEnd('', 5 - str.substr(str.lastIndexOf('.')).length, '0');
}

// 排名 获取颜色
const getColor = (rank, lastRank) => {
  rank = _.toString(rank).replace('T', '')
  lastRank = _.toString(lastRank).replace('T', '')
  if (rank && lastRank) {
    if (rank < lastRank) {
      return 'green'
    }
    if (rank === lastRank) {
      return ''
    }
    return '#FF9933'
  }
  return ''
}

// 转化html
const decodeHtml = (str) => {
  if (_.toString(str) === '') return ''
  return str.replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n/g, "<br>");
}
// 周期
const toCalculateCycle = (start, end) => {
  if (!end) {
    return start + '周'
  }
  return start + '-' + end + '周'
}

// 百分比
const toPercent = (decimal) => {
  if (decimal) {

    return Number(decimal * 100).toFixed(2) + '%'
  }
  return '';
}
// 百分比
const toNum = (decimal) => {
  if (decimal) {
    return Number(decimal).toFixed(2)
  }
  return '';
}
//#endregion


export default {
  fDict,
  fArrNotBlank,
  fStrNotBlank,
  fObjNotBlank,
  fTrim,
  fTrimStart,
  fTrimEnd,
  urlEncode,
  getDateShow,
  getDate,
  getTime,
  fieldNumberStr,
  fieldAddress,
  personAddress,
  userName,
  toStr,
  toIntegral,
  getColor,
  decodeHtml,
  toCalculateCycle,
  toPercent,
  toNum
};
