<script lang="ts" setup>
import { useUserStore } from "~/stores/user";

useSeoMeta({
  title: "My Nuxt App",
  description: () => "My program for logging issues."
});

const user = useUserStore();

const isShow = ref(false);

watchEffect(() => {
  user.setNewName("zhuxb");
});

onMounted(() => {
  setTimeout(() => isShow.value = true, 5000);
});
</script>

<template>
  <NuxtLayout>
    <div class="justify-space-between flex">
      <div class="mr-20px flex-1">
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
    <FeedbackNotification :show="isShow" content="hello" />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
