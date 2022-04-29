/**
 * 获取本地存储
 * @param name
 */
function getLocalStorage (name) {
  return window.localStorage.getItem(name)
}

/**
 * 设置本地存储
 * @param name
 * @param val
 */
function setLocalStorage (name, val) {
  window.localStorage.setItem(name, val)
}

/**
 * 清除本地存储
 * @param name
 */
function removeLocalStorage (name) {
  window.localStorage.removeItem(name)
}

export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
}
