import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  /**
   * 用户的当前姓名
   */
  const savedName = ref("");
  const previousNames = ref(new Set<string>());

  const usedNames = computed(() => Array.from(previousNames.value));
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value));

  /**
   * 更改用户的当前名称并保存之前使用的名称
   *
   * @param name - 要设置的新名称
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value);

    savedName.value = name;
  }

  return {
    setNewName,
    otherNames,
    savedName
  };
});

import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
