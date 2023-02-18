<script lang="ts" setup>
import { reactive } from "#imports";

const data = reactive([
  {
    pic: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmxL-hkIX19cdlV93xhQnaZSwqU6Jmeq7JK9P7c_FbGFfemeaMVZnC3Ow4WZbc8kMlhxGjLSR2AhN9gsxfhtkPovJJ7zUDBILREULXuvNt2aFMcUAtKbN38kPngpTfHMLwmGuGZb7zK8vaX24LRXDdXus632s2zJp7mNqqzeIar5h8E_6grv8j0T_Y4g/w600-h300-p-k-no-nu-rw-e30/Plus_UI_Typography.webp",
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "Mar 23",
    commentCount: 2,
    url: "/",
    source: "/"
  },
  {
    pic: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmxL-hkIX19cdlV93xhQnaZSwqU6Jmeq7JK9P7c_FbGFfemeaMVZnC3Ow4WZbc8kMlhxGjLSR2AhN9gsxfhtkPovJJ7zUDBILREULXuvNt2aFMcUAtKbN38kPngpTfHMLwmGuGZb7zK8vaX24LRXDdXus632s2zJp7mNqqzeIar5h8E_6grv8j0T_Y4g/w600-h300-p-k-no-nu-rw-e30/Plus_UI_Typography.webp",
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "Mar 23",
    commentCount: 2,
    url: "/",
    source: "/"
  }
]);
</script>

<template>
  <section class="popular-posts">
    <GeneralHeadText bold flower>{{ $t("articleTitle.popular-posts") }}</GeneralHeadText>
    <article v-for="(item, index) in data" :key="index">
      <div class="cover">
        <NuxtLink :to="item.url">
          <OtherListCoverOperate />
          <img :src="item.pic" alt="">
        </NuxtLink>
      </div>
      <div class="detail">
        <div class="where">
          {{ item.date }} <span class="line"></span> in
          <NuxtLink :to="item.source">Documentation</NuxtLink>
        </div>
        <div class="description">
          <div class="num">01</div>
          <div class="right-content">
            <h2 class="title">
              <NuxtLink :to="item.url">
                {{ item.title }}
              </NuxtLink>
            </h2>
            <p class="content">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.popular-posts {
  width: 300px;

  .head-text {
    margin-bottom: 40px;
  }

  > article {
    background: var(--my-theme-content);
    box-shadow: 0 5px 35px rgb(0 0 0 / 7%);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .cover {
      overflow: hidden;
      position: relative;
      margin-bottom: 20px;
      border-radius: 5px;

      > a {
        display: block;
        height: 132px;
      }

      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--my-theme-trans4);
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
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .where {
        display: flex;
        align-items: center;
        margin: 0 25px 8px;

        .line {
          margin: 0 5px;
          width: 10px;
          height: 1px;
          background-color: var(--my-theme-wire-color);
          display: inline-block;
        }
      }

      .description {
        display: flex;
        align-items: flex-start;

        * {
          line-height: 1;
        }

        .num {
          width: 25px;
          color: var(--my-theme-wire-color);
          font-size: 12px;
          margin-top: 5px;
          flex: none;
        }

        .right-content {
          .title > a {
            color: var(--my-theme-color);
            font-size: 15px;
            font-weight: bold;
            transition: var(--my-theme-trans3);
            @include t-many-over(2);
            line-height: 23px;

            &:hover {
              color: var(--my-theme-special-color);
              transition: var(--my-theme-trans3);
            }
          }

          .content {
            color: var(--my-theme-color);
            opacity: .8;
            font-size: 13px;
            font-weight: 100;
            margin-top: 12px;
            line-height: 18px;
          }
        }
      }
    }

    &:hover {
      .cover {
        > a {
          img {
            transform: scale(1.02);
            border-radius: 5px;
            transition: var(--my-theme-trans4);
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
</style>
