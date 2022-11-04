<script lang="ts" setup>
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

<template>
  <NuxtLayout>
    <OftenButton type="grb" @click="showDialog">
      hello
    </OftenButton>
    <OftenDialog :visible="isShowDialog" />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
