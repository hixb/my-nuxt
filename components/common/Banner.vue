<template>
  <div ref="eleHeight" class="banner">
    <h2>{{ $store.state.APP_PROJECT_NAME }}</h2>
    <p>{{ $store.state.APP_PROJECT_DESC }}</p>
  </div>
</template>

<script>
export default {
  name: "Banner",
  mounted() {
    this.$emit("bannerHeight", this.$refs.eleHeight.clientHeight);
  }
};
</script>

<style scoped lang="less">
.banner {
  .flex;
  .flex-ali-center;
  flex-direction: column;
  justify-content: center;
  .area-h(100vh);
  background: url(https://notes.vueice.com/1.jpg) center center / cover no-repeat;

  * {
    .color(var(--my-cur-default-theme-color));
  }

  h2 {
    .fz(35px);
  }

  p {
    .fz(21px);
    .mar-2(10px, 0);
  }
}
</style>
