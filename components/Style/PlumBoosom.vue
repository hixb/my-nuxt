<script lang="ts" setup>
import { computed, onMounted, ref } from "#imports";

interface Point {
  x: number,
  y: number
}

interface Branch {
  start: Point,
  length: number,
  theta: number
}

const WIDTH = 600;
const HEIGHT = 600;

/**
 * canvas dom element
 */
const el = ref<HTMLCanvasElement>();

const paddingTask: Function[] = [];

const frameCount = ref(0);

const ctx = computed(() => el.value!.getContext("2d")!);

onMounted(() => {
  init();
  startFrame();
});

/**
 * Init canvas
 */
function init() {
  ctx.value.strokeStyle = "rgba(208,208,208, .5)";

  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 20,
    theta: -Math.PI / 2
  });
}

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b);

  drawBranch(b);

  if (depth < 5 || Math.random() < 0.5) {
    paddingTask.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta - 0.2 * Math.random()
    }, depth + 1));
  }

  if (depth < 5 || Math.random() < 0.5) {
    paddingTask.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta + 0.2 * Math.random()
    }, depth + 1));
  }
}

function frame() {
  const tasks = [...paddingTask];

  paddingTask.length = 0;

  tasks.forEach(fn => fn());
}

function startFrame() {
  requestAnimationFrame(() => {
    frameCount.value += 1;

    frameCount.value % 10 == 0 && frame();

    startFrame();
  });
}

/**
 * lineTo
 */
function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath();

  ctx.value.moveTo(p1.x, p1.y);

  ctx.value.lineTo(p2.x, p2.y);

  ctx.value.stroke();
}

function getEndPoint(b: Branch): Point {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta)
  };
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b));
}
</script>

<template>
  <div class="hello">
    <canvas id="c" ref="el" :height="HEIGHT" :width="WIDTH" />
  </div>
</template>

<style lang="scss" scoped>
.hello {
  //--webkit-mask-image: radial-gradient(circle, transparent, black);
  //position: fixed;
  //pointer-events: none;
  //top: 0;
  //left: 0;
  //bottom: 0;
  //right: 0;

  canvas {
    border: 1px solid #fff;
    display: block;
    vertical-align: middle;
  }
}
</style>
