<script lang="ts" setup>
import { reactive } from "#imports";

const data = reactive([
  {
    pic: "https://down.om.cn/v3/Uploads/Boss/2022-10-10/spLVMIR611JEqvjQfdLIx1hskrWPiYxu.jpg?imageView2/2/w/310/h/162/q/95",
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "2022-07-26T08:56:00+08:00",
    commentCount: 2,
    url: "/"
  }
]);
</script>

<template>
  <section class="data-list">
    <article v-for="item in data" :key="item.title">
      <section class="cover">
        <NuxtLink :to="item.url">
          <div class="operate">
            <SvgIcon :is-open-hover="false" customize-class="icon" icon="emails-message/message"></SvgIcon>
            <SvgIcon :is-open-hover="false" customize-class="icon" icon="archive/archive-add">1</SvgIcon>
          </div>
          <img :src="item.pic" alt="">
        </NuxtLink>
      </section>
      <section class="detail">
        <h2 class="title">
          <NuxtLink :to="item.url">
            {{ item.title }}
          </NuxtLink>
        </h2>
        <p class="content">
          {{ item.content }}
        </p>
        <section class="outer">
          <span class="date">{{ item.date }}</span>
          <NuxtLink :to="item.url" class="read">阅读全文</NuxtLink>
        </section>
      </section>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.data-list {
  overflow: hidden;
  padding: 10px;
  background: var(--my-theme-content);
  box-shadow: 0 5px 35px rgba(0, 0, 0, .07);
  border-radius: 10px;

  * {
    transition: var(--my-theme-trans3);
  }

  > article {
    display: flex;

    .cover {
      flex: 0 0 310px;
      width: 310px;
      margin: 0 10px;

      > a {
        display: block;
        position: relative;
        transition: var(--my-theme-trans4);
        overflow: hidden;
        border-radius: 5px;

        img {
          display: block;
          max-width: none;
          max-height: 108%;
          font-size: 12px;
          text-align: center;
          width: 310px;
          height: 162px;
          object-fit: cover;
        }

        .operate {
          position: absolute;
          top: 10px;
          right: 6px;
          z-index: 1;
          display: flex;

          .icon {
            width: 26px;
            height: 26px;
            background-color: #fff;
            transition: var(--my-theme-trans3);
            box-shadow: 0 8px 25px 0 rgba(0, 0, 0, .1);
            margin: 0 5px;

            :deep(svg) {
              width: 16px;
              height: 16px;

              * {
                stroke: #08102b;
              }
            }

            &:hover {
              opacity: .8;
              transition: var(--my-theme-trans3);
            }
          }
        }
      }

      &:hover {
        > a {
          img {
            opacity: .9;
          }
        }
      }
    }

    .detail {
      flex: 1 0 calc(100% - 310px - 40px);
      width: calc(100% - 310px - 40px);
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 17px;
        font-weight: bold;

        > a {
          color: var(--my-theme-color);
          display: block;
          transition: var(--my-theme-trans3);

          &:hover {
            color: var(--my-theme-special-color);
            transition: var(--my-theme-trans3);
          }
        }
      }

      .content {
        opacity: .8;
        font-size: 15px;
        color: var(--my-theme-color);
        margin-top: 15px;
      }

      .outer {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;

        .date {
          opacity: .8;
          font-size: 15px;
          color: var(--my-theme-color);
        }

        .read {
          color: var(--my-theme-special-color);
          transition: var(--my-theme-trans2);
          animation: indicator 2s 3s infinite;
        }
      }
    }
  }

  &:hover {
    > article {
      .cover {
        > a {
          img {
            transform: scale(1.02);
          }
        }
      }

      .detail {
        .outer {
          .read {
            animation: none;
          }
        }
      }
    }
  }
}

@keyframes indicator {
  0% {
    opacity: 0
  }

  50% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}
</style>
