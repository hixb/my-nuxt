<script setup lang="ts">
import { useLocal } from "~/composables/locale";
import { useUserStore } from "~/store/user";
import { watchEffect } from "#imports";

const { setLocale, locale } = useLocal();
const user = useUserStore();

watchEffect(() => {
  user.setNewName("zhuxb");
});
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
