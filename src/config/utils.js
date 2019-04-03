// 常用数组中取值
const fDict = (value, cArr) => {
  if (typeof value === 'number') {
    value = String(value)
  }
  if (fStrNotBlank) {
    const obj = cArr.find(x => x.value === value)
    if (obj != null) {
      return obj.label
    }
  }
  return ''
}

// 判断字符串不为空
const fStrNotBlank = (value) => {
  if (value != null && value !== '') {
    return true
  }
  return false
}
// 判断数组不为空
const fArrNotBlank = (arr) => {
  if (arr != null && arr.length > 0) {
    return true
  }
  return false
}
// 判断对象不为空
const fObjNotBlank = (obj) => {
  if (obj != null && Object.keys(obj).length > 0) {
    return true
  }
  return false
}
// 字符串过滤
const fTrim = (str, char) => {
  if (fStrNotBlank(str)) {
    if (char == null) {
      return str.replace(/\s+/g, '')
    }
    var reg = new RegExp(`${char}+`, 'g')
    return str.replace(reg, '')
  }

  return ''
}
// 字符串过滤 头
const fTrimStart = (str, char) => {
  if (fStrNotBlank(str)) {
    if (char == null) {
      return str.replace(/^\s+/, '')
    }
    var reg = new RegExp(`^${char}+`)
    return str.replace(reg, '')
  }

  return ''
}
// 字符串过滤 尾
const fTrimEnd = (str, char) => {
  if (fStrNotBlank(str)) {
    if (char == null) {
      return str.replace(/\s+$/, '')
    }
    var reg = new RegExp(`${char}+$`)
    return str.replace(reg, '')
  }
  return ''
}
// 拼接字符串
const urlEncode = (param, key, encode) => {
  var paramStr = ''
  var t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

export default {
  fDict,
  fArrNotBlank,
  fStrNotBlank,
  fObjNotBlank,
  fTrim,
  fTrimStart,
  fTrimEnd,
  urlEncode
}
