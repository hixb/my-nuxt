<script lang="ts" setup>
const emit = defineEmits(["close"]);

const props = defineProps({
  // 是否可见
  visible: { type: Boolean, default: false },
  // 宽度
  width: { type: String, default: "100%" },
  // 高度
  height: { type: String, default: "100%" },
  // 是否显示标题
  isShowTitle: { type: Boolean, default: true }
});

</script>

<template>
  <Transition>
    <section v-show="visible" class="my-dialog">
      <Transition name="bounce">
        <div v-show="visible" class="dialog-body">
          <div class="close-btn" @click="emit('close', false)">
            <GlobalSvgIcon :is-open-hover="false" icon="essetional/close-square" />
          </div>
          <div v-if="isShowTitle" class="title">
            <slot name="title" />
          </div>
          <div class="content">
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.my-dialog {
  background-color: rgba(0, 0, 0, .2);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  padding-top: 80px;
  padding-bottom: 80px;
  z-index: 10;
  backdrop-filter: saturate(180%) blur(10px);
  transition: all .25s ease;
  width: v-bind("props.width");
  height: v-bind("props.height");
}

.dialog-body {
  width: 400px;
  height: 300px;
  margin: auto;
  transition: all .25s ease;
  max-width: 800px;
  position: relative;
  min-width: 400px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, .05);
  border-radius: 20px;
  background-color: var(--my-theme-bg-color);
  padding: 10px 16px;

  .title {
    padding: 10px 10px 0;
  }

  .content {
    padding: 10px 16px;
  }

  * {
    color: var(--my-theme-color);
  }
}

.close-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--my-theme-darkBs);
  width: 34px;
  height: 34px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .5);
  cursor: pointer;
  border-radius: 10px;
  transition: all .3s ease;

  &:hover {
    transition: all .3s ease;
    transform: translate(-2px, 2px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .5);
  }

  :deep(svg) {
    width: 34px;
    height: 34px;
  }
}
</style>
