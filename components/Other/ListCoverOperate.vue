<script lang="ts" setup>
const operateBtn = reactive(["emails-message/message", "archive/archive-add"]);
</script>

<template>
  <div class="operate absolute right-6px top-10px z-1 flex">
    <GlobalSvgIcon
      v-for="item in operateBtn"
      :key="item"
      :icon="item"
      :is-open-hover="false"
      customize-class="icon mx-5px"
    />
  </div>
</template>

<style lang="scss" scoped>
.operate {
  .icon {
    width: 26px;
    height: 26px;
    background-color: #fff;
    transition: var(--my-theme-trans3);
    box-shadow: 0 8px 25px 0 rgba(0, 0, 0, .1);

    :deep(svg) {
      width: 16px;
      height: 16px;

      * {
        stroke: #08102b;
      }
    }

    &:hover {
      opacity: .8;
      transition: var(--my-theme-trans3);
    }
  }
}
</style>
