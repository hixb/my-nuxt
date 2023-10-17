<script lang="ts" setup>
const { websiteTitle, connectMe } = useAuthor()
const { isArray } = useChecks()

const show = ref(true)
const progress = ref(10)

onBeforeMount(() => {
  updateProgress()
  show.value = true
})

onMounted(async () => {
  progress.value = 100
  await nextTick()
  show.value = false
})

function updateProgress() {
  const interval = setInterval(() => {
    if (progress.value < 99)
      progress.value += 1
    else
      clearInterval(interval)
  }, 10)
}
</script>

<template>
  <Transition>
    <div
      v-show="show"
      class="fixed top-0 left-0 w-screen h-screen z-[999] bg-[var(--my-bg-base-color)] flex flex-col items-center justify-between py-16 select-none"
    >
      <h2>{{ websiteTitle }}</h2>
      <div class="flex flex-col items-center">
        <div class="dazzle-box w-16 h-16 relative">
          <div
            v-for="item in 3"
            :key="item"
            class="arc absolute content-[''] top-0 left-0 w-full h-full rounded-[50%] border-b-[3px]"
          />
        </div>
        <span class="mt-2">{{ progress }}%</span>
      </div>
      <ul class="flex items-center">
        <li v-for="(item, index) in connectMe" :key="index">
          <NuxtLink :rel="isArray(item.rel) ? item.rel.join(' ') : item.rel" :target="item.target" :to="item.link">
            <SvgIcon :icon="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@mixin border-bottom($color) {
  border-bottom-color: var($color);
}

@mixin animation-delay($delay) {
  animation-delay: $delay;
}

$animation-names: rotate1, rotate2, rotate3;
$rotate-values: (
    (35deg, -45deg, 0),
    (50deg, 10deg, 0),
    (35deg, 55deg, 0)
);

$animation-settings: (
    (nth($animation-names, 1), -0.8s, --my-special-primary),
    (nth($animation-names, 2), -0.4s, --my-special-secondary),
    (nth($animation-names, 3), 0s, --my-special-success),
);

@each $name, $values in zip($animation-names, $rotate-values) {
  @keyframes #{$name} {
    from {
      transform: rotateX(nth($values, 1)) rotateY(nth($values, 2)) rotateZ(nth($values, 3));
    }

    to {
      transform: rotateX(nth($values, 1)) rotateY(nth($values, 2)) rotateZ(1turn);
    }
  }
}

.dazzle-box {
  transform-style: preserve-3d;
  perspective: 800px;

  .arc {
    @for $i from 1 through length($animation-settings) {
      $animation-setting: nth($animation-settings, $i);

      &:nth-child(#{$i}) {
        $animation-name: nth($animation-setting, 1);
        $animation-delay: nth($animation-setting, 2);
        $border-color: nth($animation-setting, 3);

        animation: #{$animation-name} 1.15s linear infinite;
        @include animation-delay($animation-delay);
        @include border-bottom($border-color);
      }
    }
  }
}
</style>
