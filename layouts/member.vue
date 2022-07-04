<template>
  <div>
    <Header />
    <Sidebar />
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Sidebar from "~/components/member/common/Sidebar";

export default {
  name: "Member",
  components: {
    Sidebar,
    Header
  }
};
</script>

<style scoped lang="less">
.main {
  .area-w(1200px);
  .mar-2(0, auto);
  .mt(120px);
}
</style>
