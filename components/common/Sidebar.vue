<template>
  <div class="info-wrapper">
    <div class="info">
      <div class="avatar">
        <div class="avatar-bg"></div>
      </div>
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
</template>

<script>
export default {
  name: "Sidebar",
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
  }
};
</script>

<style scoped lang="less">
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

    .avatar {
      .avatar-bg {

      }
    }

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

<style scoped>
.avatar-bg {
  display: block;
  position: relative;
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 48% 52% 68% 32%/42% 28% 72% 58%;
  background: linear-gradient(to right, #23D5AB, #23A6D5, #E73C7E, #EE7752, #DDD6F3);
  background-size: 500% 100%;
  animation: blobber 30s 0s linear infinite,
  cobler 30s 0s linear infinite alternate;
}

.avatar-bg::after {
  content: '';
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  background-color: #000;
  background-image: url(https://avatars.githubusercontent.com/u/61173656?v=4);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply;
  animation: blobber 30s 0s ease-in-out infinite,
  wobbler 15s 0s linear infinite alternate;
}

@keyframes blobber {
  0% {
    border-radius: 48% 52% 68% 32% / 42% 28% 72% 58%;
  }
  5% {
    border-radius: 48% 52% 41% 59% / 66% 37% 63% 34%;
  }
  10% {
    border-radius: 69% 31% 71% 29% / 67% 31% 69% 33%;
  }
  15% {
    border-radius: 60% 40% 71% 29% / 63% 65% 35% 37%;
  }
  20% {
    border-radius: 61% 39% 51% 49% / 57% 58% 42% 43%;
  }
  25% {
    border-radius: 66% 34% 25% 75% / 47% 30% 70% 53%;
  }
  30% {
    border-radius: 32% 68% 38% 62% / 65% 60% 40% 35%;
  }
  35% {
    border-radius: 63% 37% 41% 59% / 35% 38% 62% 65%;
  }
  40% {
    border-radius: 57% 43% 49% 51% / 55% 71% 29% 45%;
  }
  45% {
    border-radius: 47% 53% 34% 66% / 65% 36% 64% 35%;
  }
  50% {
    border-radius: 44% 56% 32% 68% / 69% 26% 74% 31%;
  }
  55% {
    border-radius: 28% 72% 37% 63% / 71% 44% 56% 29%;
  }
  60% {
    border-radius: 38% 62% 35% 65% / 74% 53% 47% 26%;
  }
  65% {
    border-radius: 73% 27% 46% 54% / 54% 47% 53% 46%;
  }
  70% {
    border-radius: 75% 25% 47% 53% / 49% 53% 47% 51%;
  }
  75% {
    border-radius: 62% 38% 43% 57% / 55% 60% 40% 45%;
  }
  80% {
    border-radius: 41% 59% 65% 35% / 73% 50% 50% 27%;
  }
  85% {
    border-radius: 55% 45% 57% 43% / 73% 61% 39% 27%;
  }
  90% {
    border-radius: 74% 26% 33% 67% / 40% 65% 35% 60%;
  }
  95% {
    border-radius: 58% 42% 57% 43% / 53% 45% 55% 47%;
  }
  100% {
    border-radius: 48% 52% 68% 32% / 42% 28% 72% 58%;
  }
}

@keyframes cobler {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@keyframes wobbler {
  0% {
    transform: rotateZ(8deg);
  }
  100% {
    transform: rotateZ(-8deg);
  }
}
</style>
