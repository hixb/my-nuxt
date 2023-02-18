<script lang="ts" setup>
import { reactive } from "#imports";

const data = reactive([
  {
    pic: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmxL-hkIX19cdlV93xhQnaZSwqU6Jmeq7JK9P7c_FbGFfemeaMVZnC3Ow4WZbc8kMlhxGjLSR2AhN9gsxfhtkPovJJ7zUDBILREULXuvNt2aFMcUAtKbN38kPngpTfHMLwmGuGZb7zK8vaX24LRXDdXus632s2zJp7mNqqzeIar5h8E_6grv8j0T_Y4g/w600-h300-p-k-no-nu-rw-e30/Plus_UI_Typography.webp",
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "2022-07-26T08:56:00+08:00",
    commentCount: 2,
    url: "/",
    source: "/"
  },
  {
    pic: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmxL-hkIX19cdlV93xhQnaZSwqU6Jmeq7JK9P7c_FbGFfemeaMVZnC3Ow4WZbc8kMlhxGjLSR2AhN9gsxfhtkPovJJ7zUDBILREULXuvNt2aFMcUAtKbN38kPngpTfHMLwmGuGZb7zK8vaX24LRXDdXus632s2zJp7mNqqzeIar5h8E_6grv8j0T_Y4g/w600-h300-p-k-no-nu-rw-e30/Plus_UI_Typography.webp",
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "2022-07-26T08:56:00+08:00",
    commentCount: 2,
    url: "/",
    source: "/"
  }
]);
</script>

<template>
  <section class="data-list">
    <GeneralHeadText bold flower>{{ $t("articleTitle.pinned-post") }}</GeneralHeadText>
    <article v-for="item in data" :key="item.title">
      <div class="cover">
        <NuxtLink :to="item.url">
          <OtherListCoverOperate />
          <img :src="item.pic" alt="">
        </NuxtLink>
      </div>
      <div class="detail">
        <div class="where">
          in
          <NuxtLink :to="item.source">Documentation</NuxtLink>
        </div>
        <h2 class="title">
          <NuxtLink :to="item.url">
            {{ item.title }}
          </NuxtLink>
        </h2>
        <p class="content">
          {{ item.content }}
        </p>
        <div class="outer">
          <span class="date">
            <b class="published">Published</b>
            {{ item.date }}
          </span>
          <NuxtLink :to="item.url" class="read">阅读全文</NuxtLink>
        </div>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.data-list {
  .head-text {
    margin-bottom: 40px;
  }

  * {
    transition: var(--my-theme-trans3);
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 15px;
    background: var(--my-theme-special-color);
    border-radius: 0 0 0 20px;
    opacity: .1;
  }

  > article {
    display: flex;
    overflow: hidden;
    padding: 10px;
    background: var(--my-theme-content);
    box-shadow: 0 5px 35px rgba(0, 0, 0, .07);
    border-radius: 10px;
    position: relative;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 0;
    }

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

      .where {
        opacity: .7;
        color: var(--my-theme-color);
        margin-bottom: 15px;

        a {
          opacity: 1;
          transition: var(--my-theme-trans3);

          &:hover {
            opacity: .7;
            transition: var(--my-theme-trans3);
            text-decoration: underline;
          }
        }
      }

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
          display: flex;
          align-items: center;

          .published {
            background-color: var(--my-theme-special-color);
            color: #fff;
            font-weight: normal;
            padding: 2px 4px;
            font-size: 12px;
            margin-right: 5px;
            border-radius: 2px;
          }
        }

        .read {
          color: var(--my-theme-special-color);
          transition: var(--my-theme-trans2);
          animation: indicator 2s 3s infinite;
        }
      }
    }

    &:hover {
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
