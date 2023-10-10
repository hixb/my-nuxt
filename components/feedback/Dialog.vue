<script lang="ts" setup>
interface IProps {
  visible: boolean
  width?: string
  height?: string
  isShowTitle?: boolean
}

withDefaults(defineProps<IProps>(), {
  visible: false,
  width: '500px',
  isShowTitle: true,
})

const emit = defineEmits(['close'])
</script>

<template>
  <Transition>
    <section
      v-show="visible"
      class="my-dialog fixed left-0 top-0 z-100 max-h-[100vh] flex items-start justify-center overflow-x-auto overflow-y-hidden"
    >
      <Transition name="bounce">
        <div
          v-show="visible"
          class="dialog-body relative m-auto h-full max-w-[800px] min-w-[400p]x w-[400px] rounded-3xl p-7 max-md:!w-[calc(100vw-40px)] max-md:mb-[20px]"
        >
          <div
            class="close-btn absolute -right-1.5 -top-1.5 h-8 w-8 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg"
            @click="emit('close', false)"
          >
            <SvgIcon :is-open-hover="false" :size="30" icon="essetional/close-square" />
          </div>
          <div v-if="isShowTitle" class="mb-4 px-2.5">
            <slot name="title" />
          </div>
          <div class="px-4 py-2.5">
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
  width: 100vw;
  height: 100vh;
  z-index: 200;

  * {
    @apply text-2xs;
  }
}

.dialog-body {
  transition: all .25s ease;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, .05);
  background-color: var(--my-bg-base-color);
  width: v-bind("props.width");
  height: v-bind("props.height");

  * {
    color: var(--my-text-base-color);
  }
}

.close-btn {
  background-color: var(--my-darkBs);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .25);
  transition: all .3s ease;

  &:hover {
    transition: all .3s ease;
    transform: translate(-2px, 2px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  }
}
</style>
