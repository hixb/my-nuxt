<script lang="ts" setup>
import { onDeactivated, reactive, ref } from "#imports";
import type { PropType } from "vue";

const props = defineProps({
  // 速度
  speed: { type: Number, default: 4 },
  // 透明度
  opacity: { type: Number, default: .4 },
  // 类型
  type: {
    type: String as PropType<"primary" | "success" | "warning" | "danger" | "grb" | "ordinary">,
    default: "primary"
  },
  // 形状
  shape: {
    type: String as PropType<"plain" | "circle" | "round" | "square" | "semicircle">,
    default: "plain"
  },
  // 跳转路由
  href: {
    type: String,
    default: ""
  }
});

const color = ref<string>("");

const radius = ref<number>(0);

const context = ref<any>(null);

const initialized = ref<boolean>(false);

const speedOpacity = ref<number>(0);

const timer = ref<number>(-1);

const origin = reactive<any>({
  x: "",
  y: ""
});

const el = ref<any>("");

onDeactivated(() => {
  if (timer.value) {
    window.cancelAnimationFrame(timer.value);

    timer.value = -1;
  }
});

/**
 * 初始化
 * @param el
 */
function init(el: {
  parentElement: HTMLElement;
  width: number;
  height: number | undefined;
  getContext: (arg0: string) => never;
}) {
  const oBtn = el.parentElement;

  color.value = getStyle(el.parentElement, "color");

  const w: number = getStyleNumber(oBtn, "width") || 0;

  // 透明度的速度
  speedOpacity.value = (props.speed / w) * props.opacity;

  // canvas 宽和高
  el.width = w;

  el.height = getStyleNumber(oBtn, "height");

  context.value = el.getContext("2d");
}

/**
 * 波纹
 * @param event
 */
function ripple(event: MouseEvent) {
  // 清除上次没有执行的动画
  timer && window.cancelAnimationFrame(timer.value);

  el.value = event.target;

  // 执行初始化
  if (!initialized.value) {
    initialized.value = true;
    init(el.value);
  }

  radius.value = 0;

  // 点击坐标原点
  origin.x = event.offsetX;
  origin.y = event.offsetY;

  context.value.clearRect(0, 0, el.value.width, el.value.height);

  el.value.style.opacity = props.opacity;

  draw();
}

/**
 * 绘制波纹
 */
function draw() {
  context.value.beginPath();

  // 绘制波纹
  context.value.arc(origin.x, origin.y, radius.value, 0, 2 * Math.PI, false);

  context.value.fillStyle = color.value;

  context.value.fill();

  // 定义下次的绘制半径和透明度
  radius.value += props.speed;

  el.value.style.opacity -= speedOpacity.value;

  // 通过判断半径小于元素宽度或者还有透明度, 不断绘制圆形
  if (radius.value < el.width || el.value.style.opacity > 0) {
    timer.value = window.requestAnimationFrame(draw);
  } else {
    // 清除画布
    context.value.clearRect(0, 0, el.value.width, el.value.height);

    el.value.style.opacity = 0;
  }
}

/**
 * 根据属性, 获取元素的样式值
 * @param el
 * @param attr
 */
function getStyle(el: HTMLElement, attr: string) {
  return window.getComputedStyle(el, null)[attr as never];
}

/**
 * 获取属性, 并且属性值是数字, 而不是字符串
 * @param el
 * @param attr
 */
function getStyleNumber(el: HTMLElement, attr: string) {
  try {
    const val = getStyle(el, attr);

    return parseFloat(val);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 跳转路由
 */
function jump() {
  props.href && window.open(props.href);
}
</script>

<template>
  <button :class="['my-btn overflow-hidden relative cursor-pointer', shape, type]" @click="jump">
    <canvas class="absolute left-0 top-0 h100% w100% op0" @click="ripple" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.my-btn {
  transition: var(--my-theme-trans3);

  &:hover {
    transform: translateY(-3px);
    transition: var(--my-theme-trans3);
  }
}


.plain {
  padding: 8px 12px;
  border-radius: 12px;
}

.round {
  padding: 8px 12px;
  border-radius: 4px;
}

.semicircle {
  padding: 8px 12px;
  border-radius: 100px;
}

.square {
  border-radius: 8px;
  padding: 8px;
}

.circle {
  border-radius: 30px;
  padding: 8px;
}

.primary {
  color: #fff;
  background-color: #056aff;
}

.success {
  background-color: #e3f7e2;

  &:hover {
    color: var(--my-theme-color);
    background: rgba(70, 201, 58, .25);
  }
}

.warning {
  color: var(--my-theme-color);
  background-color: #ffba00;

  &:hover {
    box-shadow: 0 10px 20px -10px rgba(255, 186, 0, .7);
  }
}

.danger {
  background: transparent;
  color: rgba(255, 71, 87);
  border: 2px solid rgba(255, 71, 87);

  &:hover {
    border-color: rgba(255, 163, 171);
    box-shadow: 0 10px 20px -10px rgba(255, 163, 171, .7);
  }
}

.grb {
  color: var(--my-theme-color);
  background: linear-gradient(30deg, rgba(59, 222, 200, .5) 33%, rgba(59, 222, 200, 1));

  &:hover {
    box-shadow: 0 10px 20px -10px rgba(59, 222, 200, .7);
  }
}

.ordinary {
  background-color: var(--my-theme-ordinary-bgc);
  transition: var(--my-theme-trans3);

  &:hover {
    transition: var(--my-theme-trans3);
    opacity: .9;
  }
}
</style>
