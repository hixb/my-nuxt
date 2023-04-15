<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

interface IconParams {
  [key: string]: {
    name?: string;
    path?: string;
    cate?: string;
    svg: string;
  }[]
}

const iconList = ref<Partial<IconParams>>({});

const isShowNotify = ref(false);

withIcon();

async function withIcon() {
  const icon = Object.entries(import.meta.glob("assets/iconLib/**/**.svg", { as: "raw", eager: false }))
    .map(async(item: [string, () => Promise<string>]) => {
      // name
      const name = item[0].split("/").pop()?.split("_").pop()?.split(".")[0];

      // path
      const path = item[0].split("_").pop()?.split(".")[0].replace("/assets/iconLib/", "");

      // cate
      const cate = path?.split("/")[0];

      // svg picture
      const svg = await item[1]().then(res => res);

      return {
        name,
        path,
        cate,
        svg
      };
    });


  const res = await Promise.all(icon);

  iconList.value = res.reduce<IconParams>((acc, curr) => {
    if (!curr.cate) return acc;

    if (acc[curr.cate]) {
      acc[curr.cate]?.push(curr);
    } else {
      acc[curr.cate] = [curr];
    }

    return acc;
  }, {} as IconParams);
}

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
      <div v-for="(item, name) in iconList" :key="name" class="cate-list mt30px flex flex-col">
        <h4>{{ name }}</h4>
        <ul class="icon-box-list flex flex-wrap">
          <li
            v-for="v in item" :key="v.name" class="m10px h50px w62px flex flex-col cursor-pointer items-center"
            @click="getIconName(v.path)"
          >
            <div class="" v-html="v.svg"></div>
            <span class="mt5px text-12px op60">{{ v.name }}</span>
          </li>
        </ul>
      </div>
    </section>
    <FeedbackNotification :show="isShowNotify" content="Copy Success!" />
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.container {
  box-shadow: var(--my-theme-shallow-shadow);

  .icon-box-list {
    margin-top: 10px;

    li {
      >span {
        @include t-many-over(1);
      }
    }
  }
}
</style>
