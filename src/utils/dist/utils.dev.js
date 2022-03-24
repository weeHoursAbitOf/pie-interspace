"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* 
  毫秒转为正常格式时间过滤器 
  编写过滤器传入需要的时间格式，例如：yyyy-MM-dd hh:mm:ss或者yyyy年MM月dd日
  注意：月MM必须大写，目的为了区分月与分，其他都为小写
  时间格式定义：
    参数为0格式：yyyy-MM-dd hh:mm:ss 
    参数为1格式：yyyy-MM-dd 
    参数为2格式：hh:mm:ss 
    参数为3格式：yyyy年MM月dd日 hh时mm分ss秒
    参数为4格式：yyyy年MM月dd日 
    参数为5格式：hh时mm分ss秒
    参数为6格式：yyyy年MM月 
    参数为7格式：yyyy
    参数为8格式：yyyy/MM/dd 
*/
var formatDate = function formatDate(date, fmt) {
  var date = new Date(date);

  if (fmt == 0) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  } else if (fmt == 1) {
    fmt = "yyyy-MM-dd";
  } else if (fmt == 2) {
    fmt = "hh:mm:ss";
  } else if (fmt == 3) {
    fmt = "yyyy年MM月dd日 hh时mm分ss秒";
  } else if (fmt == 4) {
    fmt = "yyyy年MM月dd日";
  } else if (fmt == 5) {
    fmt = "hh时mm分ss秒";
  } else if (fmt == 6) {
    fmt = "yyyy年MM月";
  } else if (fmt == 7) {
    fmt = "yyyy";
  } else if (fmt == 8) {
    fmt = "yyyy/MM/dd";
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (var k in o) {
    if (new RegExp("(".concat(k, ")")).test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
};
/* 一位数两位数转换 */


var padLeftZero = function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
/* 获取当前时间戳 */


var getUnix = function getUnix(data) {
  var date = new Date(data);
  return date.getTime();
};
/* 获取今天0点0分0秒的时间戳 */


var getTodayUnix = function getTodayUnix() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
/* 获取今年1月1日0点0分0秒的时间戳 */


var getYearUnix = function getYearUnix() {
  var date = new Date();
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
/* 获取标准年月日 */


var getLastDate = function getLastDate(time) {
  var date = new Date(parseInt(time));
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return date.getFullYear() + '/' + month + "/" + day;
};
/* 
  获取发送消息时间过滤器
  还用过滤器就可以实现转换
*/


var getFormatTime = function getFormatTime(timestamp) {
  var now = getUnix(); //当前时间戳

  var today = getTodayUnix(); //今天0点时间戳

  var year = getYearUnix(); //今年0点时间戳

  var timer = (now - timestamp) / 1000; // 转换为秒级时间戳

  var tip = '';

  if (timer <= 0) {
    tip = '刚刚';
  } else if (Math.floor(timer / 60) <= 0) {
    tip = '刚刚';
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + '分钟前';
  } else if (timer >= 3600 && timestamp - today >= 0) {
    tip = Math.floor(timer / 3600) + '小时前';
  } else if (timer / 86400 <= 31) {
    tip = Math.ceil(timer / 86400) + '天前';
  } else {
    tip = getLastDate(timestamp);
  }

  return tip;
};
/* 获取周（星期） */


var getWeek = function getWeek(date) {
  var datelist = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var weekDay = datelist[new Date(date).getDay()];
  return weekDay;
}; //电话号校验


var checkoutPhoneNum = function checkoutPhoneNum(phoneNum) {
  if (/^1[0-9]{7,11}$/.test(phoneNum)) {
    return true;
  } else {
    return false;
  }
}; // 校验密码


var CheckSecretKey = function CheckSecretKey(pass) {
  // 由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间。
  if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(pass)) {
    return true;
  } else {
    return false;
  }
};

CheckSecretKey("123456789"); //单位邮编校验

var checkoutZipCode = function checkoutZipCode(zipCode) {
  if (/^[0-9]{6}$/.test(zipCode)) {
    return true;
  } else {
    return false;
  }
}; //单位传真校验


var checkoutFax = function checkoutFax(fax) {
  if (/^[0-9]{7}$/.test(fax)) {
    return true;
  } else {
    return false;
  }
};

var compareObject = function compareObject(obj1, obj2) {
  //Object.getOwnPropertyNames():方法返回一个指定对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
  //对象内置属性方法:Object.keys()；该方法返回一个数组，数组内包括对象内可枚举属性以及方法名称。数组中属性名的排列顺序和使用 for...in 遍历该对象时返回的顺序一致。
  var attrs1 = Object.keys(obj1);
  var attrs2 = Object.keys(obj2);

  if (attrs1.length != attrs2.length) {
    return false;
  }

  for (var j = 0; j < attrs1.length; j++) {
    var attrNames = attrs1[j];

    if (obj1[attrNames] != obj2[attrNames]) {
      return false;
    }
  }

  return true;
}; // 用于文件下载封装


var fileBlobDown = function fileBlobDown(fileNameType, res) {
  var blob = new Blob([res], {
    type: "application/vnd.ms-excel"
  });
  var objecturl = URL.createObjectURL(blob); // 创建a标签

  var a = document.createElement("a");
  a.href = objecturl; // 从末尾\\开始截取

  a.download = fileNameType.substring(fileNameType.lastIndexOf("/") + 1); // 插入a标签

  document.body.appendChild(a); // a标签点击事件

  a.click(); // 删除a标签

  document.body.removeChild(a);
};

var _default = {
  formatDate: formatDate,
  getFormatTime: getFormatTime,
  getWeek: getWeek,
  checkoutPhoneNum: checkoutPhoneNum,
  checkoutZipCode: checkoutZipCode,
  checkoutFax: checkoutFax,
  compareObject: compareObject,
  getUnix: getUnix,
  fileBlobDown: fileBlobDown,
  CheckSecretKey: CheckSecretKey
};
exports["default"] = _default;