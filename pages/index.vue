<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
import { watchEffect } from "#imports";

const user = useUserStore();

watchEffect(() => {
  user.setNewName("zhuxb");
});
</script>

<template>
  <NuxtLayout>
    <!--    <GeneralButton type="grb" @click="showDialog">-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <GeneralButton>-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <FeedbackDialog :visible="isShowDialog" @close="isShowDialog = false" />-->
    <DataEntryList />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
