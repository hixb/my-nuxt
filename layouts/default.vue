<template>
  <div>
    <Header />
    <main class="main">
      <Nuxt />
      <GoBack />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import GoBack from "@/components/common/GoBack";

export default {
  components: {
    GoBack,
    Header,
    Footer
  }
};
</script>

<style scoped lang="less"></style>
