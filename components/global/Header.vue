<template>
  <header>
    <nuxt-link to="/">
      <h1>
        <img src="~/assets/images/logo.png" alt="logo">
        <span>dawnIceZhu's Notes</span>
      </h1>
    </nuxt-link>
    <div class="links">
      <div class="color-picker">
        颜色
      </div>
      <div class="search">
        <vs-input
          v-model="keyword"
          type="search"
        />
      </div>
      <div class="nav-links"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/common/header.less";
</style>
