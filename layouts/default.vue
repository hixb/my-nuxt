<template>
  <div :class="['app', currentTheme]">
    <div class="app-box">
      <Header @themeToggle="themeToggle" />
      <main class="main">
        <div class="info-wrapper">
          <div class="info">
            <img src="https://avatars.githubusercontent.com/u/61173656?v=4" alt="">
            <h3>HIXB</h3>
          </div>
          <div class="num">
            <div>
              <span>12</span>
              <span>article</span>
            </div>
            <div>
              <span>5</span>
              <span>tag</span>
            </div>
          </div>
          <div class="sidebar-links">
            <div v-for="(sidebar, index) in sidebarMenu" :key="index">
              <span>{{ sidebar.title }}</span>
              <ul>
                <li v-for="(child, i) in sidebar.child" :key="i">
                  <nuxt-link :to="child.link">
                    <p>
                      <i :class="child.icon"></i>
                      <span>{{ child.name }}</span>
                    </p>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Nuxt />
        <!--      <GoBack />-->
      </main>
      <!--    <Footer />-->
    </div>
    <div class="video-bg">
      <video autoplay loop muted>
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4">
      </video>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import GoBack from "@/components/common/GoBack";

export default {
  components: {
    Header
  },
  data() {
    return {
      currentTheme: "",
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
              link: "/external/update",
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
    };
  },
  methods: {
    themeToggle(val) {
      this.currentTheme = val ? "light-mode" : "";
    }
  }
};
</script>

<style scoped lang="less">

.app {
  * {
    .trans;
  }

  .app-box {
    .bgc(var(--my-theme-bg-color));
    .area(90%, 90vh);
    border-radius: 14px;
    backdrop-filter: blur(20px);
    .pof;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .trans;

    .main {
      padding-right: 30px;
      height: 94%;
      display: flex;
    }
  }
}

.video-bg {
  .pof;
  right: 0;
  top: 0;
  .area(100%, 100%);

  video {
    .area(100%, 100%);
    object-fit: cover;
  }
}

.info-wrapper {
  .area-w(20%);
  height: 100%;
  border-right: 1px solid var(--my-theme-border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;

  .info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      .area(96px, 96px);
      border-radius: 50%;
    }

    h3 {
      font-size: 19px;
      color: var(--my-theme-color);
      margin: 10px 0;
    }
  }

  .num {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 30%;

      span {
        color: var(--my-theme-color);

        &:first-child {
          margin-bottom: 10px;
          font-size: 18px;
        }
      }

      &:first-child {
        border-right: 1px solid var(--my-theme-border-color);
      }
    }
  }

  .sidebar-links {
    padding: 26px;

    > div {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      > span {
        color: var(--my-theme-inactive-color);
        font-size: 21px;
      }

      > ul {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        margin-top: 14px;

        li {
          text-decoration: none;
          display: flex;
          align-items: center;
          font-weight: 400;
          padding: 10px;
          font-size: 14px;
          border-radius: 6px;
          .trans;

          > a {
            width: 100%;
            display: flex;
            justify-content: space-between;

            p {
              display: flex;
              align-items: center;

              > i, > span {
                color: var(--my-theme-color);
              }

              > i {
                width: 16px;
                vertical-align: text-top;
                display: block;
              }

              > span {
                margin-left: 5px;
              }
            }

            > span {
              width: 18px;
              height: 18px;
              font-size: 11px;
              background-color: #6fcc8e;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;

              color: var(--my-theme-color);
            }
          }

          &:hover {
            background-color: var(--my-theme-hover-menu-bg);
          }
        }
      }

    }
  }
}
</style>
