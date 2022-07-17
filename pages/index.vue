<template>
  <div class="home">
    <!--    <div class="info-wrapper">-->
    <!--      <div class="info">-->
    <!--        <img src="https://avatars.githubusercontent.com/u/61173656?v=4" alt="">-->
    <!--        <h3>HIXB</h3>-->
    <!--      </div>-->
    <!--      <div class="num">-->
    <!--        <div>-->
    <!--          <span>12</span>-->
    <!--          <span>article</span>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <span>5</span>-->
    <!--          <span>tag</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="sidebar-links">-->
    <!--        <div v-for="(sidebar, index) in sidebarMenu" :key="index">-->
    <!--          <span>{{ sidebar.title }}</span>-->
    <!--          <ul>-->
    <!--            <li v-for="(child, i) in sidebar.child" :key="i">-->
    <!--              <nuxt-link :to="child.link">-->
    <!--                <p>-->
    <!--                  <i :class="child.icon"></i>-->
    <!--                  <span>{{ child.name }}</span>-->
    <!--                </p>-->
    <!--              </nuxt-link>-->
    <!--            </li>-->
    <!--          </ul>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="content-r">
      <div class="content-wrapper-header">
        <div class="content-wrapper-context">
          <h3 class="img-content">
            <svg viewBox="0 0 512 512">
              <path d="M467 0H45C20.099 0 0 20.099 0 45v422c0 24.901 20.099 45 45 45h422c24.901 0 45-20.099 45-45V45c0-24.901-20.099-45-45-45z" fill="#d6355b" data-original="#ff468c" />
              <path xmlns="http://www.w3.org/2000/svg" d="M512 45v422c0 24.901-20.099 45-45 45H256V0h211c24.901 0 45 20.099 45 45z" fill="#d6355b" data-original="#d72878" />
              <path xmlns="http://www.w3.org/2000/svg" d="M467 30H45c-8.401 0-15 6.599-15 15v422c0 8.401 6.599 15 15 15h422c8.401 0 15-6.599 15-15V45c0-8.401-6.599-15-15-15z" fill="#2e000a" data-original="#700029" />
              <path xmlns="http://www.w3.org/2000/svg" d="M482 45v422c0 8.401-6.599 15-15 15H256V30h211c8.401 0 15 6.599 15 15z" fill="#2e000a" data-original="#4d0e06" />
              <path xmlns="http://www.w3.org/2000/svg" d="M181 391c-41.353 0-75-33.647-75-75 0-8.291 6.709-15 15-15s15 6.709 15 15c0 24.814 20.186 45 45 45s45-20.186 45-45-20.186-45-45-45c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75c0 8.291-6.709 15-15 15s-15-6.709-15-15c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45c41.353 0 75 33.647 75 75s-33.647 75-75 75z" fill="#d6355b" data-original="#ff468c" />
              <path xmlns="http://www.w3.org/2000/svg" d="M391 361h-30c-8.276 0-15-6.724-15-15V211h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-45c0-8.291-6.709-15-15-15s-15 6.709-15 15v45h-15c-8.291 0-15 6.709-15 15s6.709 15 15 15h15v135c0 24.814 20.186 45 45 45h30c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#d6355b" data-original="#d72878" />
            </svg>
            Adobe Stock
          </h3>
          <div class="content-text">
            Grab yourself 10 free images from Adobe Stock in a 30-day free trial plan and find perfect image, that will help you with your new project.
          </div>
          <vs-button success flat class="content-button">
            前往
          </vs-button>
        </div>
        <img class="content-wrapper-img" src="https://assets.codepen.io/3364143/glass.png" alt="">
      </div>
      <div class="article-list">
        <div class="container">
          <div v-for="(item, index) in articleList" :key="index" class="box">
            <span></span>
            <div class="content">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="article-info">
                <div>
                  <i class="iconfont ice-account"></i>
                  {{ item.author }}
                </div>
                <div>
                  <i class="iconfont ice-date"></i>
                  {{ item.time }}
                </div>
              </div>

              <a :href="item.link">
                <vs-button success flat class="go-to">
                  前往
                </vs-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  layout: "default",
  data() {
    return {
      sidebarMenu: [
        {
          title: "应用",
          child: [
            {
              link: "/",
              icon: "iconfont ice-home",
              name: "首页"
            },
            {
              link: "/",
              icon: "iconfont ice-home",
              name: "更新内容"
            }
          ]
        },
        {
          title: "分类",
          child: [
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "vue"
            },
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "react"
            },
            {
              link: "/",
              icon: "iconfont ice-category",
              name: "javascript"
            }
          ]
        }
      ],
      articleList: [
        {
          title: "你好啊",
          description: "电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭电饭锅当返回电饭",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        },
        {
          title: "你好啊",
          description: "健康是福那就肯定发你个",
          link: "/",
          author: "hixb",
          time: "2022-01-01",
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~assets/css/page/index.less";
</style>
