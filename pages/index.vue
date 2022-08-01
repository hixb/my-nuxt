<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { watchEffect } from "#imports";
import { fetchRoomList } from "~/server/api";

const user = useUserStore();

watchEffect(() => {
  user.setNewName("zhuxb");
});

function getData() {
  fetchRoomList();
}

getData();
</script>

<template lang="pug">
NuxtLayout
</template>

<style scoped lang="scss">

</style>
