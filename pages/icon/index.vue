<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

const iconList = ref<Partial<{
  [key: string]: {
    name: string;
    path: string;
    cate: string;
    svg: string;
  }[]
}>>([]);

const isShowNotify = ref(false);

const isShowLoading = ref(true);

onMounted(async() => {
  const icon = import.meta.glob("assets/iconLib/**/**.svg", {
    as: "raw",
    eager: false
  });

  for (const key in icon) {
    if (Object.hasOwnProperty.call(icon, key)) {
      const item = icon[key];
      // name
      const name = item.name.split("/").pop().split("_").pop().split(".")[0];

      // path
      const path = item
        .name
        .split("_")
        .pop()
        .split(".")[0]
        .replace("/assets/iconLib/", "");

      // cate
      const cate = path.split("/")[0];

      iconList.value.push({ name, path, cate, svg: await icon[key]() });
    }
  }

  iconList.value = iconList.value.reduce((acc, curr) => {
    if (acc[curr.cate]) {
      acc[curr.cate].push(curr);
    } else {
      acc[curr.cate] = [curr];
    }
    return acc;
  }, {});

  isShowLoading.value = false;
});

function getIconName(name: string) {
  isShowNotify.value = false;
  useClipboard().copy(name.toLowerCase().replace(/\(|\)/g, ""));
  nextTick(() => isShowNotify.value = true);
}
</script>

<template>
  <NuxtLayout>
    <section class="b-rd-10px p20px container">
      <h3 class="text-30px font-bold">Icon Lib:</h3>
      <div v-for="(item, name) in iconList" :key="item" class="cate-list mt30px flex flex-col">
        <h4>{{ name }}</h4>
        <ul class="icon-box-list flex flex-wrap">
          <li
            v-for="v in item" :key="v.name"
            class="m10px h50px w62.5px flex flex-col cursor-pointer items-center"
            @click="getIconName(v.path)"
          >
            <div class="" v-html="v.svg"></div>
            <span class="mt5px text-12px op60">{{ v.name }}</span>
          </li>
        </ul>
      </div>
    </section>
    <FeedbackNotification :show="isShowNotify as boolean" content="Copy Success!" />
    <FeedbackLoading :visible="isShowLoading as boolean" />
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--my-theme-darkBs);
  box-shadow: var(--my-theme-shallow-shadow);

  .icon-box-list {
    margin-top: 10px;

    li {
      > span {
        @include t-many-over(1);
      }
    }
  }
}
</style>
