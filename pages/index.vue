<script setup lang="ts">
import { useLocal } from "~/composables/locale";

const { setLocale, locale } = useLocal();
</script>
<template>
  <div>
    <button @click="setLocale(locale === 'en' ? 'zh-CN' : 'en')">
      切换语言
    </button>
    <span>{{ $t('hixb') }}</span>
  </div>
</template>
<style scoped lang="scss">
.home {
  > span {
    color: $red;
  }

  > p {
    color: $blue;
  }
}
</style>
