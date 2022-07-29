import server from "../request";

const FetchData = {
  /**
   * 获取博客列表
   * @returns {*}
   */
  getArticleList() {
    return server({
      url: "/article/list",
      method: "get"
    });
  },
  /**
   * 获取博客详情
   * @param params
   * @returns {*}
   */
  getArticleDetail(params) {
    return server({
      url: "/article/detail",
      method: "get",
      params
    });
  },
  /**
   * 发布新文章
   * @param data
   * @returns {*}
   */
  pushArticle(data) {
    return server({
      url: "/article/new",
      method: "post",
      data
    });
  }
};

export default FetchData;
