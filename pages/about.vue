<script lang="ts" setup>
const route = useRoute()

const breadcrumb = [
  { link: '/', name: '首页' },
  { link: route.path, name: '关于我' },
]

const blogStats = reactive([
  { title: 'Total Visits', count: '170.47K', icon: 'security/eye' },
  { title: 'Posts', count: '17', icon: 'design-tools/brush-2' },
  { title: 'Comments', count: '46', icon: 'emails-message/message' },
])
</script>

<template>
  <NuxtLayout name="about">
    <div class="flex flex-col items-center">
      <div>
        <NavigationBreadcrumb :list="breadcrumb" />
        <h3 class="text-3xl font-bold py-10">
          关于我
        </h3>
        <div
          class="relative max-w-3xl shadow-[0_10px_40px_rgba(149,157,165,.2)] mt-24 rounded-[20px] px-8 pt-20 pb-24 flex items-center flex-col"
        >
          <img
            alt=""
            class="shadow-[0_5px_20px_rgba(0,0,0,.2)] w-28 h-28 absolute rounded-full border-4 border-[var(--my-bg-mild)]  -top-14"
            src="/avatar.jpg"
          >
          <h1 class="mb-5">
            Xiaobing Zhu
          </h1>
          <p class="leading-7 text-center">
            Lorem ipsum dolor sit amet. Qui ratione rerum vel odit alias qui totam placeat! Aut esse sint hic possimus
            reprehenderit et consectetur beatae voluptates fugit. A earum vero et quos ipsa vel voluptatum sequi vel
            numquam nostrum eum explicabo vero.
          </p>
        </div>
        <div class="mt-14">
          <h3 class="mb-5 text-center text-2xl font-bold">
            Blog Stats
          </h3>
          <ul class="flex flex-wrap flex-row">
            <li
              v-for="item in blogStats"
              :key="item.title"
              class="rounded-[20px] shadow-[0_5px_20px_rgba(149,157,165,.2)] w-[calc(50%-4px)] flex flex-col justify-center items-center p-2 even:ml-2 mb-2"
            >
              <div class="flex items-center">
                <SvgIcon :icon="item.icon" :is-open-hover="false" />
                {{ item.title }}
              </div>
              <span class="text-3xl">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>

</style>
