<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
import { useSeoMeta, watchEffect } from "#imports";

useSeoMeta({
  title: "My Nuxt App",
  description: () => "My program for logging issues."
});

const user = useUserStore();

watchEffect(() => {
  user.setNewName("zhuxb");
});
</script>

<template>
  <NuxtLayout>
    <div class="home">
      <div class="host">
        <DataEntryList />
      </div>
      <DataEntryPopularPosts />
    </div>
    <!--    <GeneralButton type="grb" @click="showDialog">-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <GeneralButton>-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <FeedbackDialog :visible="isShowDialog" @close="isShowDialog = false" />-->
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-between;

  .host {
    flex: 1;
    margin-right: 20px;
  }
}
</style>
