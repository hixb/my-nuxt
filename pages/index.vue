<template>
  <div class="home">
    <div class="info-wrapper">
      <div class="info">
        <img src="https://avatars.githubusercontent.com/u/61173656?v=4" alt="">
        <h3>HIXB</h3>
      </div>
      <div class="num">
        <div>
          <span>12</span>
          <span>article</span>
        </div>
        <div>
          <span>5</span>
          <span>tag</span>
        </div>
      </div>
      <div class="sidebar-links">
        <div v-for="(sidebar, index) in sidebarMenu" :key="index">
          <span>{{ sidebar.title }}</span>
          <ul>
            <li v-for="(child, i) in sidebar.child" :key="i">
              <nuxt-link :to="child.link">
                <p>
                  <i :class="child.icon"></i>
                  <span>{{ child.name }}</span>
                </p>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  layout: "default",
  data() {
    return {
      sidebarMenu: [
        {
          title: "应用",
          child: [
            {
              link: "/",
              icon: "iconfont ice-home",
              name: "首页"
            },
            {
              link: "/",
              icon: "iconfont ice-home",
              name: "更新内容"
            }
          ]
        },
        {
          title: "分类",
          child: [
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "vue"
            },
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "react"
            },
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "javascript"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~assets/css/page/index.less";
</style>
