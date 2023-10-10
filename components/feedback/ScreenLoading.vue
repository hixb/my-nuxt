<script lang="ts" setup>
const { websiteTitle, connectMe } = useAuthor()

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
      v-if="show"
      class="fixed top-0 left-0 w-screen h-screen z-[999] bg-[var(--my-bg-base-color)] flex flex-col items-center justify-between py-16 select-none"
    >
      <h2>{{ websiteTitle }}</h2>
      <div class="flex flex-col items-center">
        <div class="dazzle-box w-16 h-16 relative">
          <div v-for="item in 3" :key="item" class="arc" />
        </div>
        <span class="mt-2">{{ progress }}%</span>
      </div>
      <ul class="flex items-center">
        <li v-for="(item, index) in connectMe" :key="index">
          <NuxtLink :rel="item.rel.join(' ')" :target="item.target" :to="item.link">
            <SvgIcon :icon="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.dazzle-box {
  transform-style: preserve-3d;
  perspective: 800px;

  .arc {
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: rotate#{$i} 1.15s linear infinite;

        @if $i == 1 {
          animation-delay: -0.8s;
          border-bottom-color: var(--my-special-primary);
        } @else if $i == 2 {
          animation-delay: -0.4s;
          border-bottom-color: var(--my-special-secondary);
        } @else if $i == 3 {
          animation-delay: 0s;
          border-bottom-color: var(--my-special-success);
        }
      }
    }

    @apply absolute content-[""] top-0 left-0 w-full h-full rounded-[50%] border-b-[3px]
  }
}

@keyframes rotate1 {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(1turn);
  }
}

@keyframes rotate2 {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
  }

  to {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(1turn);
  }
}

@keyframes rotate3 {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(1turn);
  }
}
</style>
