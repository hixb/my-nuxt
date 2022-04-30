<template>
  <div class="banner">
    <h2>dawnIceZhu's Notes</h2>
    <p>People can skip meals for twelve days, But programming can’t stop writing for a day.</p>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
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
