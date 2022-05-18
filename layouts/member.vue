<template>
  <div>
    <Header />
    <main class="main">
      <Sidebar />
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from "~/components/global/Header";
import Sidebar from "~/components/member/common/Sidebar";
export default {
  name: "Member",
  components: { Sidebar, Header }
};
</script>

<style scoped lang="less">
.main {
  .area-w(1500px);
  .mar-2(0, auto);
}
</style>
