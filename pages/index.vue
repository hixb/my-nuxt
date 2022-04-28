<template>
  <div>
    <Header />
    <article v-for="(component, index) in exampleComponents" :key="index">
      <component :is="component" />
    </article>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/global/Header'
import Footer from '~/components/global/Footer'
import Main from '~/pages/main'

export default {
  name: 'Home',
  components: { Footer, Header, Main },
  data () {
    return {
      exampleComponents: [
        Main
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
