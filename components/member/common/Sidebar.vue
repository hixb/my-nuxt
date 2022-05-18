<template>
  <div class="sidebar">
    <div class="hidden">
      <vs-sidebar v-model="active" absolute hover-expand reduce open>
        <template #logo>
          <img src="~/assets/images/logo.png" alt="logo">
        </template>
        <vs-sidebar-item v-for="(item, index) in sidebarList" :id="item.id" :key="index" @click.native="jump(item)">
          <template #icon>
            <i :class="['isax', item.icon]" />
          </template>
          {{ item.name }}
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class="isax isax-message-notif" />
              <template #badge>
                28
              </template>
            </vs-avatar>
            <vs-avatar>
              <img src="https://vuesax.com/avatars/avatar-5.png" alt="">
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data () {
    return {
      active: "member",
      sidebarList: [
        {
          id: "member",
          icon: "isax-home-hashtag",
          name: "首页",
          link: "/member"
        }
      ]
    };
  },
  mounted () {
    this.active = this.$route.path.replace("/", "");
  },
  methods: {
    jump (item) {
      this.$router.push(item.link);
    }
  }
};
</script>

<style scoped lang="less">
.sidebar {
  /deep/ .vs-sidebar-content, /deep/ .vs-sidebar__item__icon, /deep/ .vs-avatar, /deep/ .vs-sidebar__item {
    .bgc(var(--my-cur-default-theme-bgc));
  }

  /deep/ .vs-sidebar-content {
    .pof !important;
    overflow: hidden;
    .area-h(auto);
    top: 50%;
    transform: translateY(-50%);
    .box-s(var(--my-cur-default-theme-shadow));

    .vs-sidebar__item__text {
      .color(var(--my-cur-default-theme-color));
    }

    .hasIcon:after {
      .bgc(var(--my-bright-active-theme-color)) !important;
    }

    .vs-sidebar__item__icon {
      i {
        .fw(bold);
      }
    }

    .vs-sidebar__group__content:after {
      .opa(.3);
      .bgc(var(--my-bright-active-theme-color));
    }

    .vs-sidebar__item {
      &.active {
        .vs-sidebar__item__text, .vs-sidebar__item__icon i {
          .color(var(--my-bright-active-theme-color));
        }
      }
    }

    .vs-avatar-content {
      .trans;
      .cursor(pointer);

      &:first-child {
        i {
          .trans;
        }

        &:hover {
          .box-s(var(--my-cur-default-theme-shadow));

          i {
            .trans;
            transform: scale(1.5);
          }
        }
      }
    }

    .vs-avatar {
      .bgc(var(--my-cur-default-theme-oter));
    }

    .vs-sidebar__logo {
      img {
        .max-wh(100px, 100px)
      }
    }
  }
}
</style>
