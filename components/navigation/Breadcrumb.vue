<script lang="ts" setup>
interface IProps {
  list: {
    link: string
    name: string
  }[]
}

withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <ul class="breadcrumb pb-5 flex items-center">
    <li v-for="item in list" :key="item.name">
      <NuxtLink :to="item.link" class="text-sm hover:opacity-80 transition-[var(--my-theme-trans3)]">
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.breadcrumb {
  > * {
    &:not(:last-child) {
      &:after {
        content: "/";
        margin: 0 8px;
        font-size: 90%;
        opacity: .6;
      }
    }
  }
}
</style>
