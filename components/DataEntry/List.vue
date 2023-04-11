<script lang="ts" setup>
const pic = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmxL-hkIX19cdlV93xhQnaZSwqU6Jmeq7JK9P7c_FbGFfemeaMVZnC3Ow4WZbc8kMlhxGjLSR2AhN9gsxfhtkPovJJ7zUDBILREULXuvNt2aFMcUAtKbN38kPngpTfHMLwmGuGZb7zK8vaX24LRXDdXus632s2zJp7mNqqzeIar5h8E_6grv8j0T_Y4g/w600-h300-p-k-no-nu-rw-e30/Plus_UI_Typography.webp";

const data = reactive([
  {
    pic,
    title: "js判读两个数组对象是否相同",
    content: "let arr1 = [{id: 1, name: '嘿嘿', go: 'xi', child: {id: 55}, is: 2}, 'hh…",
    date: "2022-07-26T08:56:00+08:00",
    commentCount: 2,
    url: "/",
    source: "/"
  },
  {
    pic,
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
    <article
      v-for="item in data"
      :key="item.title"
      class="relative mt20px flex overflow-hidden b-rd-10px p-10px"
    >
      <div class="cover mx-10px my-0 w310px">
        <NuxtLink :to="item.url" class="relative block overflow-hidden b-rd-5px">
          <OtherListCoverOperate />
          <NuxtImg
            :alt="item.title"
            :src="item.pic"
            class="block h162px max-h-100% max-w-auto w310px items-center object-cover text-12px"
            fit="cover"
            format="webp"
            height="162"
            loading="lazy"
            quality="80"
            width="310"
          />
        </NuxtLink>
      </div>
      <div class="detail mx-10px flex flex-col justify-center">
        <div class="where mb15px op70">
          in
          <NuxtLink :to="item.source" class="op100 hover-op70">Documentation</NuxtLink>
        </div>
        <h2 class="title text-17px font-bold">
          <NuxtLink :to="item.url" class="block">
            {{ item.title }}
          </NuxtLink>
        </h2>
        <p class="content text-15px op80">
          {{ item.content }}
        </p>
        <div class="outer mt-15px flex justify-between">
          <span class="date flex items-center text-15px op80">
            <b class="published mr-5px b-rd-2px px-4px py-2px text-12px font-normal">Published</b>
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

  > article {
    background: var(--my-theme-content);
    box-shadow: 0 5px 35px rgba(0, 0, 0, .07);

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

    &:first-of-type {
      margin-top: 0;
    }

    .cover {
      flex: 0 0 310px;

      > a {
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
      width: calc(100% - 310px - 40px);

      .where {
        color: var(--my-theme-color);

        a {
          transition: var(--my-theme-trans3);

          &:hover {
            transition: var(--my-theme-trans3);
            text-decoration: underline;
          }
        }
      }

      .title {
        > a {
          color: var(--my-theme-color);
          transition: var(--my-theme-trans3);

          &:hover {
            color: var(--my-theme-special-color);
            transition: var(--my-theme-trans3);
          }
        }
      }

      .content {
        margin-top: 15px;
        color: var(--my-theme-color);
      }

      .outer {
        .date {
          color: var(--my-theme-color);

          .published {
            background-color: var(--my-theme-special-color);
            color: #fff;
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
