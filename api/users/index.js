import server from '../request'

const FetchData = {
  /**
   * 登录
   * @param data
   * @returns {*}
   */
  login (data) {
    return server({
      url: '/user/login',
      method: 'post',
      data
    })
  }
}

export default FetchData
