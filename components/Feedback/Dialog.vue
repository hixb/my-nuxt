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
    <section
      v-show="visible"
      class="my-dialog fixed left-0 top-0 z-10 max-h-100vh flex items-start justify-center overflow-x-auto overflow-y-hidden pb-80px pt-80px"
    >
      <Transition name="bounce">
        <div
          v-show="visible"
          class="dialog-body relative m-auto h300px max-w-800px min-w-400px w400px b-rd-20px px-16px py-10px"
        >
          <div
            class="close-btn absolute right--5px top--5px h34px w34px flex cursor-pointer items-center justify-center overflow-hidden b-rd-10px"
            @click="emit('close', false)"
          >
            <GlobalSvgIcon :is-open-hover="false" icon="essetional/close-square" />
          </div>
          <div v-if="isShowTitle" class="mb-10px px-10px">
            <slot name="title" />
          </div>
          <div class="px-16px py-10px">
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
  backdrop-filter: saturate(180%) blur(10px);
  transition: all .25s ease;
  width: v-bind("props.width");
  height: v-bind("props.height");
}

.dialog-body {
  transition: all .25s ease;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, .05);
  background-color: var(--my-theme-bg-color);

  * {
    color: var(--my-theme-color);
  }
}

.close-btn {
  background-color: var(--my-theme-darkBs);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .5);
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
