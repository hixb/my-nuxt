import Vue from "vue";

/**
 * 获取本地存储
 * @param name
 */
const getLocalStorage = (name) => {
  return window.localStorage.getItem(name);
};

/**
 * 设置本地存储
 * @param name
 * @param val
 */
const setLocalStorage = (name, val) => {
  window.localStorage.setItem(name, val);
};

/**
 * 清除本地存储
 * @param name
 */
const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name);
};

/**
 * 获取cookie
 * @param cookieName
 * @returns {string|null}
 */
const getCookie = (cookieName) => {
  const arr = document.cookie.match(new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  }
  return null;
};

/**
 * 获取当月天数
 * @returns {number}
 */
const mGetDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const d = new Date(year, month, 0);
  return d.getDate();
};

/**
 * 移动缓出
 * @param A
 * @param B
 * @param rate
 * @param callback
 */
Math.easeout = function(A, B, rate, callback) {
  if (A == B || typeof A != "number") {
    return;
  }
  B = B || 0;
  rate = rate || 2;

  let step = function() {
    A = A + (B - A) / rate;
    if (Math.abs(A - B) < 1) {
      callback(B, true);
      return;
    }
    callback(A, false);
    requestAnimationFrame(step);
  };
  step();
};

const utils = {
  /**
   * 获取指定cookie
   * 是否登录判断规则 ==> *_当月时间÷5000_当天时间到0点的时间戳÷5000_zxb
   * @returns {string}
   */
  isLogin() {
    return getCookie("is_login") == `*_${mGetDate() / 5000}_${new Date(new Date().toLocaleDateString()).getTime() / 5000}_zxb`;
  },
  /**
   * 轻提示
   * @param type
   * @param message
   */
  toast(type = "danger", message) {
    Vue.prototype.$vs.notification({
      border: type,
      position: "top-right",
      title: "提示",
      text: message
    });
  },
  /**
   * 时间戳转换为时间
   * @param timestamp
   * @returns {string}
   */
  timestampToTime(timestamp) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + "-";
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    const D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()) + " ";
    const h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    const m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
    const s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  },
  /**
   * 减速滚动
   * @param height
   */
  scrollEaseOut(height) {
    let doc = document.body.scrollTop ? document.body : document.documentElement;
    Math.easeout(doc.scrollTop, height, 10, function(value) {
      doc.scrollTop = value;
    });
  },
};

export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
};

Vue.prototype.$utils = utils;
