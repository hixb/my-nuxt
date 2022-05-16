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
          <span>{{ timestampToTime(listData.createtime) }}</span>
        </li>
      </ul>
    </div>
    <div class="content">
      {{ listData.content }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({
    app,
    $axios,
    store,
    error,
    params
  }) {
    try {
      const res = await Promise.all([
        $axios.get(`/blog/detail?id=${params.id}`)
      ])
      const listData = res[0].data.data
      return {
        listData
      }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {}
  },
  methods: {
    timestampToTime (timestamp) {
      const date = new Date(timestamp)
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/page/article/index.less";
</style>
