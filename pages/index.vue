<template>
  <div>
    <Banner @bannerHeight="bannerHeight" />
    <main class="main">
      <menu ref="menu" :class="['user-info', isFixed ? 'menu-fixed' : '']">
        <div class="my-info">
          <div class="info-avatar">
            <img src="https://notes.vueice.com/avatar.png" alt="">
          </div>
          <h3 class="info-name">
            {{ $store.state.MY_NAME }}
          </h3>
          <div class="article-tag">
            <div class="art-num">
              <span>17</span>
              <span>文章</span>
            </div>
            <div class="tag-num">
              <span>8</span>
              <span>标签</span>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in menuList" :key="index" :class="item.className">
          <p class="title">
            <i :class="['iconfont', `ice-${item.icon}`]" />
            <span>{{ item.title }}</span>
          </p>
          <ul>
            <li v-for="(list, i) in item.list" :key="i"
                :style="item.ident === 'tag' ? `background-color: ${list.bgc};` : ''"
            >
              <nuxt-link :to="item.ident !== 'friend' ? list.link : ''">
                <i v-if="item.ident === 'friend'" :style="{backgroundColor: list.bgc}" />
                <span>{{ list.name }}</span>
                <em v-if="item.ident === 'category'" :style="{backgroundColor: list.bgc}">
                  {{ list.count }}
                </em>
                <div v-if="item.ident === 'friend'" class="friend-box">
                  <div class="info-title">
                    <div class="info">
                      <img :src="list.avatar" alt="">
                      <h4>{{ list.name }}</h4>
                    </div>
                    <span class="link" :style="{backgroundColor: list.bgc}">
                      go
                    </span>
                  </div>
                  <div class="desc">
                    {{ list.desc }}
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </menu>
      <article :class="isFixed ? 'offset-val' : ''">
        <nuxt-link v-for="(item, index) in articleList" :key="index" :to="item.link" class="article-link">
          <h2 class="title">
            {{ item.title }}
          </h2>
          <div v-if="item.description !== ''" class="description">
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
      </article>
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
      getClientHei: 0,
      isFixed: false,
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
        },
        {
          title: '嘿嘿嘿',
          description: '',
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
        },
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
        },
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
        },
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
        },
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
        },
      ],
      categoryList: [
        {
          name: '随笔',
          count: 7,
          link: '',
          bgc: '#df5865'
        },
        {
          name: 'vpn',
          count: 7,
          link: '',
          bgc: '#6bcc8a'
        }
      ],
      menuList: [
        {
          ident: 'category',
          title: '分类',
          icon: 'category',
          className: 'category',
          list: [
            {
              name: '随笔',
              count: 7,
              link: '',
              bgc: '#df5865'
            },
            {
              name: 'vpn',
              count: 7,
              link: '',
              bgc: '#6bcc8a'
            }
          ]
        },
        {
          ident: 'tag',
          title: '标签',
          icon: 'tag',
          className: 'tag',
          list: [
            {
              name: 'all',
              link: '',
              bgc: '#df5865'
            },
            {
              name: '随笔',
              link: '',
              bgc: '#6bcc8a'
            }
          ]
        },
        {
          ident: 'friend',
          title: '友链',
          icon: 'friend',
          className: 'friend',
          list: [
            {
              name: '午后南杂',
              link: '',
              bgc: '#df5865',
              avatar: 'https://1.gravatar.com/avatar/96c4520adcd6c7233dd9886bef10d862?s=50&amp;d=mm&amp;r=x',
              desc: 'Enjoy when you can, and endure when you must.'
            },
            {
              name: 'vuepress-theme-reco',
              link: '',
              bgc: '#6bcc8a',
              avatar: 'https://1.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=50&amp;d=mm&amp;r=x',
              desc: 'A simple and beautiful vuepress Blog & Doc theme.'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.isFixed = window.scrollY >= (this.getClientHei - 60)
    })
  },
  methods: {
    bannerHeight (val) {
      this.getClientHei = val
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/page/index.less";
</style>
