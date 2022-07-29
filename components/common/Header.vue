<template>
  <header>
    <div class="btn-area">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="menu-links">
      <div class="theme-toggle" @click="themeToggle">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>
      <div class="search-bar">
        <input type="text">
      </div>
      <ul class="menu">
        <li>
          <nuxt-link to="/">
            Apps
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            Yourwork
          </nuxt-link>
        </li>
      </ul>
      <div class="profile">
        <div class="notification">
          <span>3</span>
          <svg
            viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-bell"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <vs-button success flat class="login-btn">
          <i class="iconfont ice-lock"></i>
          登录
        </vs-button>
      </div>
    </div>
  </header>
</template>

<script>export default {
  name: "Header",
  data() {
    return {
      isBrightTheme: false
    };
  },
  methods: {
    themeToggle() {
      this.isBrightTheme = !this.isBrightTheme;
      this.$emit("themeToggle", this.isBrightTheme);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/css/common/header.less";
</style>
