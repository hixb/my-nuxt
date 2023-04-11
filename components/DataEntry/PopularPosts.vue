<script lang="ts" setup>
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
  <section class="popular-posts w300px">
    <GeneralHeadText bold flower>{{ $t("articleTitle.popular-posts") }}</GeneralHeadText>
    <article
      v-for="(item, index) in data"
      :key="index"
      class="mb20px b-rd-10px p20px"
    >
      <div class="cover relative mb20px overflow-hidden b-rd-5px">
        <NuxtLink :to="item.url" class="block h132px">
          <OtherListCoverOperate />
          <NuxtImg
            :alt="item.title"
            :src="item.pic"
            class="h100% w100% b-rd-5px object-cover"
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
        <div class="where align-center mx-25px mb8px flex items-center">
          {{ item.date }} <span class="line mx-5px inline-block h1px w10px"></span> in
          <NuxtLink :to="item.source">Documentation</NuxtLink>
        </div>
        <div class="description flex items-start">
          <div class="num mt5px w25px flex-none text-12px">01</div>
          <div class="right-content">
            <h2 class="title">
              <NuxtLink :to="item.url" class="text-15px font-bold lh-23px">
                {{ item.title }}
              </NuxtLink>
            </h2>
            <p class="content text-13px font-100 lh-18px op80">
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
  .head-text {
    margin-bottom: 40px;
  }

  > article {
    background: var(--my-theme-content);
    box-shadow: 0 5px 35px rgb(0 0 0 / 7%);

    &:last-of-type {
      margin-bottom: 0;
    }

    .cover {
      img {
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

      .where {
        .line {
          background-color: var(--my-theme-wire-color);
        }
      }

      .description {
        * {
          line-height: 1;
        }

        .num {
          color: var(--my-theme-wire-color);
        }

        .right-content {
          .title > a {
            color: var(--my-theme-color);
            transition: var(--my-theme-trans3);
            @include t-many-over(2);

            &:hover {
              color: var(--my-theme-special-color);
              transition: var(--my-theme-trans3);
            }
          }

          .content {
            margin-top: 12px;
            color: var(--my-theme-color);
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
