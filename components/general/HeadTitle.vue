<script setup lang="ts">
interface IProps {
  flower: boolean
}

withDefaults(defineProps<IProps>(), {
  flower: false,
})
</script>

<template>
  <h2 class="head-title" :class="flower ? '' : 'before:!content-none'">
    <slot />
  </h2>
</template>

<style scoped lang="scss">
.head-title {
  &:before {
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 276.167 276.167' fill='%23989b9f'><path d='M33.144,2.471C15.336,2.471,0.85,16.958,0.85,34.765s14.48,32.293,32.294,32.293s32.294-14.486,32.294-32.293 S50.951,2.471,33.144,2.471z'/><path d='M137.663,2.471c-17.807,0-32.294,14.487-32.294,32.294s14.487,32.293,32.294,32.293c17.808,0,32.297-14.486,32.297-32.293 S155.477,2.471,137.663,2.471z'/><path d='M243.873,67.059c17.804,0,32.294-14.486,32.294-32.293S261.689,2.471,243.873,2.471s-32.294,14.487-32.294,32.294 S226.068,67.059,243.873,67.059z'/><path d='M243.038,170.539c17.811,0,32.294-14.483,32.294-32.293c0-17.811-14.483-32.297-32.294-32.297 s-32.306,14.486-32.306,32.297C210.732,156.056,225.222,170.539,243.038,170.539z'/><path d='M136.819,170.539c17.804,0,32.294-14.483,32.294-32.293c0-17.811-14.478-32.297-32.294-32.297 c-17.813,0-32.294,14.486-32.294,32.297C104.525,156.056,119.012,170.539,136.819,170.539z'/><path d='M243.771,209.108c-17.804,0-32.294,14.483-32.294,32.294c0,17.804,14.49,32.293,32.294,32.293 c17.811,0,32.294-14.482,32.294-32.293S261.575,209.108,243.771,209.108z'/></svg>") center / 20px no-repeat;

    @apply content-[""] absolute top-0 right-0 w-5 h-5 inline-block opacity-30
  }

  &:after {
    @apply content-[""] inline-block align-middle w-6 mx-2.5 border-b border-[var(--my-border-color)] opacity-80
  }

  @apply mb-6 text-base font-bold relative
}
</style>
