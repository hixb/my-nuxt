<template>
  <div>
    <Banner />
    <main class="main">
      <ul class="article-list">
        <li v-for="(item, index) in articleList" :key="index" class="abstract-item">
          <nuxt-link :to="item.link">
            <h2 class="title">
              {{ item.title }}
            </h2>
            <div class="description">
              {{ item.description }}
            </div>
            <div class="info">
              <ul>
                <li v-for="(info, i) in item.info" :key="i" :class="info.link ? 'add-color' : ''"
                    @click.prevent="$router.push(info.link)"
                >
                  <i :class="['iconfont', `ice-${info.icon}`]" />
                  <span>{{ info.name }}</span>
                </li>
              </ul>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <!--      <div class="user-info"></div>-->
    </main>
  </div>
</template>

<script>
import Banner from '@/components/common/Banner'

export default {
  name: 'Home',
  components: { Banner },
  layout: 'default',
  data () {
    return {
      articleList: [
        {
          title: 'Vue press',
          description: '快速搭建',
          link: 'qq.com',
          info: [
            {
              name: this.$store.state.MY_NAME,
              icon: 'account'
            },
            {
              name: '2022/1/21',
              icon: 'date'
            },
            {
              name: 'js',
              icon: 'tag',
              link: 'baidu.com'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import "~assets/css/page/index.less";
</style>
