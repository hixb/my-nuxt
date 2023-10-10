<script setup lang="ts">
const { connectMe } = useAuthor()
</script>

<template>
  <footer>
    <div class="bg-[var(--my-darkBs)] relative overflow-hidden p-5 shadow-[0_5px_35px_rgba(0,0,0,.1)] text-[var(--my-base-color)] flex items-center justify-between rounded-xl">
      <div class="flex items-center">
        <span style="font-family:Arial, Helvetica, sans-serif">©</span>
        <bdi class="ml-1">
          <NuxtLink class="overflow-hidden overflow-ellipsis flex items-center" to="https://www.vueice.com/">
            hixb
            <svg class="certified" viewBox="0 0 24 24">
              <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
            </svg>
          </NuxtLink>
        </bdi>
        <time class="ml-2 opacity-80">
          2022-{{ new Date().getFullYear() }}
        </time>
      </div>
      <p class="max-xs:hidden">
        <NuxtLink to="/" target="_blank">
          粤公网安备 44156545号
        </NuxtLink>
      </p>
      <ul class="flex items-center">
        <li v-for="(item, index) in connectMe" :key="index">
          <NuxtLink :to="item.link" target="_blank" :rel="item.rel.join(' ')">
            <SvgIcon :overall-size="30" :size="20" :icon="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  * {
    @apply text-sm
  }

  @apply text-[97%] pt-10 pb-10 max-md:pb-[calc(55px+20px+28px)]
}

.certified {
  fill: var(--my-special-color);

  * {
    stroke: var(--my-special-color);
  }

  @apply w-3 h-3 ml-1
}
</style>
