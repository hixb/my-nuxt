<script lang="ts" setup></script>

<template>
  <div class="operate">
    <GlobalSvgIcon :is-open-hover="false" customize-class="icon" icon="emails-message/message" />
    <GlobalSvgIcon :is-open-hover="false" customize-class="icon" icon="archive/archive-add" />
  </div>
</template>

<style lang="scss" scoped>
.operate {
  position: absolute;
  top: 10px;
  right: 6px;
  z-index: 1;
  display: flex;

  .icon {
    width: 26px;
    height: 26px;
    background-color: #fff;
    transition: var(--my-theme-trans3);
    box-shadow: 0 8px 25px 0 rgba(0, 0, 0, .1);
    margin: 0 5px;

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
