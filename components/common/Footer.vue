<template>
  <footer>
    <ul>
      <li v-for="(item, index) in footerData" :key="index">
        <a :href="item.link ? item.link : 'javascript:;'" :target="item.link ? '_blank' : ''">
          <i :class="['iconfont', `ice-${item.icon}`]" />
          <span>{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data () {
    return {
      footerData: [
        {
          name: "粤ICP备2021110925号",
          icon: "beian",
          link: "https://icp.chinaz.com/home/info?host=vueice.com"
        },
        {
          name: this.$store.state.MY_NAME,
          icon: "copyright"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
footer {
  .area(100%, 70px);
  .mt(100px);
  .pad-2(0, 15px);
  .bd-t(1px, solid, var(--my-cur-default-theme-bor-color));
  .flex;
  .flex-ali-center;
  .flex-jus-spa-aro;

  ul {
    .flex;
    .flex-ali-center;

    li {
      .mar-2(0, 15px);

      span {
        .color(var(--my-bright-active-theme-color));
      }
    }
  }
}
</style>
