<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { ref, watchEffect } from "#imports";
import { fetchRoomList } from "~/server/api";

const user = useUserStore();
const isShowDialog = ref<boolean>(false);

watchEffect(() => {
  user.setNewName("zhuxb");
});

const showDialog = () => {
  isShowDialog.value = true;
};

function getData() {
  fetchRoomList();
}

getData();
</script>

<template lang="pug">
NuxtLayout
  div.default(@click="showDialog") hello
  OftenDialog(v-model:visible="isShowDialog")
</template>

<style scoped lang="scss">
.default {
  color: var(--my-theme-color);
}
</style>
