<template>
  <div>
    <Header />
    <main class="main">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

export default {
  components: { Header, Footer }
}
</script>

<style scoped lang="less">
  .main {
    width: 1500px;
    margin: 0 auto;
  }
</style>
