import server from '../request'

const FetchData = {
  /**
   * 获取博客列表
   * @returns {*}
   */
  getBlogList () {
    return server({
      url: '/blog/list',
      method: 'get'
    })
  },
  /**
   * 获取博客详情
   * @param params
   * @returns {*}
   */
  getBlogDetail (params) {
    return server({
      url: '/blog/detail',
      method: 'get',
      params
    })
  }
}

export default FetchData
