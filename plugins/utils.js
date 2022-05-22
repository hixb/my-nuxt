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

const utils = {
  /**
   * 获取指定cookie
   * 是否登录判断规则 ==> *_当月时间÷5000_当天时间到0点的时间戳÷5000_zxb
   * @returns {string}
   */
  isLogin () {
    return getCookie("is_login") == `*_${mGetDate() / 5000}_${new Date(new Date().toLocaleDateString()).getTime() / 5000}_zxb`;
  },
  toast (type = "danger", message) {
    Vue.prototype.$vs.notification({
      border: type,
      position: "top-right",
      title: "提示",
      text: message
    });
  }
};

export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
};

Vue.prototype.$utils = utils;
