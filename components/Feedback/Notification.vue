<script lang="ts" setup>
/**
 * 通知组件props的参数类型
 */
export interface NotificationPropType {
  /**
   * 位置
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * 标题
   */
  title?: string;

  /**
   * 内容
   */
  content: string | number;

  /**
   * 持续时间
   */
  destroy?: number;

  /**
   * 显示
   */
  show: boolean;
}

const props = withDefaults(defineProps<NotificationPropType>(), {
  position: "bottom-right",
  title: "notification.notification-title",
  content: "",
  destroy: 3000,
  show: false
});

const visible = ref<boolean>(false);

const timer = ref<ReturnType<typeof setTimeout>>();

const position = computed(() => {
  switch (props.position) {
    case "top-left":
      return "top-20px left-20px";
    case "top-right":
      return "top-20px right-20px";
    case "bottom-left":
      return "bottom-20px left-20px";
    case "bottom-right":
      return "bottom-20px right-20px";
    default:
      return "top-20px left-20px";
  }
});

watch(() => props.show, newVal => {
  if (newVal) {
    visible.value = newVal;

    timer.value = setTimeout(() => {
      visible.value = false;
    }, props.destroy);
  } else {
    destroyNotification();
  }
});

onDeactivated(() => destroyNotification());

function destroyNotification() {
  if (timer.value) {
    clearTimeout(timer.value);
    visible.value = false;
  }
}
</script>

<template>
  <Transition name="bounce">
    <section
      v-show="visible && show"
      :class="['notification badge-xs-teal fixed z-100 h-auto max-w340px w100% break-words p20px', position]"
    >
      <GlobalSvgIcon
        :is-open-hover="false"
        class="absolute right-0 top-0"
        icon="essetional/close-square"
        @click="destroyNotification"
      />
      <h3 class="pb-6px text-15px font-bold">{{ $t(title) }}</h3>
      <p class="text-12px lh-2 op70">
        {{ content }}
      </p>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
.notification {
  background-color: var(--my-theme-content);
  box-shadow: var(--my-theme-shadow);
  border-radius: 10px;
  transition: var(--my-theme-trans2);
  border-right: 3px solid var(--my-theme-special-color);

  :deep(svg) {
    transform: scale(1.5);
    transition: var(--my-theme-trans2);

    &:hover {
      transform: scale(1.5) rotate(180deg);
      transition: var(--my-theme-trans2);
    }
  }

  h3, p {
    color: var(--my-theme-color);
  }

  p {
    line-height: 15px;
  }

  &:hover {
    transition: var(--my-theme-trans2);
    transform: translateY(2px);
    box-shadow: none;
  }
}

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
</style>
