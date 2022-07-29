<script setup lang="ts"></script>

<template>
  <div class="home">
    <span>hello</span>
    <p>哈哈</p>
  </div>
</template>

<style scoped lang="scss">
.home {
  > span {
    color: $red;
  }

  > p {
    color: $blue;
  }
}
</style>
