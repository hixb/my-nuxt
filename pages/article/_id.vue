<template>
  <div class="detail">
    <div class="title">
      <h2>{{ listData.title }}</h2>
      <ul>
        <li>
          <i class="iconfont ice-account" />
          <span>{{ listData.author }}</span>
        </li>
        <li>
          <i class="iconfont ice-date" />
          <span>{{ $utils.timestampToTime(listData.createtime) }}</span>
        </li>
      </ul>
    </div>
    <div class="content" v-html="listData.content" />
  </div>
</template>

<script>
export default {
  async asyncData({
    app,
    $axios,
    store,
    error,
    params
  }) {
    try {
      const res = await Promise.all([
        $axios.get(`/blog/detail?id=${params.id}`)
      ]);
      const listData = res[0].data.data;
      return {
        listData
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped lang="less">
@import "~assets/css/page/article/index.less";
</style>
