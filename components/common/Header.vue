<template>
  <header>
    <div ref="scheduleBar" class="schedule"></div>
    <nuxt-link to="/">
      <h1>
        <img src="~/assets/images/logo.png" alt="logo">
        <span>{{ $store.state.APP_PROJECT_NAME }}</span>
      </h1>
    </nuxt-link>
    <div class="links">
      <div class="color-picker">
        <i class="iconfont ice-color" @click="isShowPicker = !isShowPicker" />
        <div :class="['color-picker-menu', !isShowPicker ? 'hide-picker' : 'show-picker']">
          <span class="title">选择颜色</span>
          <ul>
            <li v-for="(item, index) in colorPickerSelect" :key="item.id" :class="{active: defaultTheme === index}"
                @click="toggleTheme(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="search">
        <i class="iconfont ice-search" />
        <input
          v-model="keyword" v-focus="focusState" type="text" :class="{focused: focusState}"
          @click="focusState = true" @blur="focusState = false" @keypress="enterSearch"
        >
      </div>
      <div class="nav-links">
        <div v-for="(item, index) in navLink" :key="index"
             :class="['nav-item', item.children.length > 0 ? 'drop-down' : '']"
        >
          <nuxt-link :to="item.link" class="link">
            <i :class="['iconfont', item.icon]" />
            <span>{{ item.title }}</span>
            <i v-if="item.children.length > 0" class="arrow" />
          </nuxt-link>
          <ul v-if="item.children.length > 0">
            <li v-for="(nav, i) in item.children" :key="i">
              <nuxt-link :to="nav.link">
                <i :class="['iconfont', nav.icon]" />
                <span>{{ nav.name }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <vs-button v-if="!isLogin" success flat class="login-btn" :active="active === 1" @click="showLoginModel">
          <i class="iconfont ice-lock"></i>
          登录
        </vs-button>
        <div v-else class="avatar">
          <vs-avatar badge badge-color="success" class="user-avatar">
            <img src="https://vuesax.com/avatars/avatar-6.png" alt="">
          </vs-avatar>
          <ul class="info-list">
            <li @click="$router.push('/member')">
              个人中心
            </li>
            <li @click="outLogin">
              退出登录
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getLocalStorage, setLocalStorage } from "@/plugins/utils";

const dark = [ "rgba(24, 24, 24)", "rgba(255, 255, 255, 0.8)" ];
const light = [ "rgba(255, 255, 255)", "rgba(44, 62, 80)" ];
const otherDark = [ "rgba(17, 17, 17)" ];
const otherLight = [ "rgba(243, 244, 244)" ];
const darkShadow = [ "0 1px 8px 0 rgba(0, 0, 0, 0.6)", "0 2px 16px 0 rgba(0, 0, 0, 0.7)" ];
const lightShadow = [ "0 1px 8px 0 rgba(0, 0, 0, 0.2)", "0 2px 16px 0 rgba(0, 0, 0, 0.2)" ];
const darkBorColor = [ "rgba(0, 0, 0, 0.3)" ];
const lightBorColor = [ "rgba(234, 236, 239)" ];

export default {
  name: "Header",
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  data() {
    return {
      keyword: "",
      oldKeyword: "",
      active: -1,
      isLogin: false,
      colorPickerSelect: [
        {
          id: 0,
          name: "dark"
        },
        {
          id: 1,
          name: "auto"
        },
        {
          id: 2,
          name: "light"
        },
      ],
      defaultTheme: 1,
      isShowPicker: false,
      focusState: false,
      navLink: [
        {
          title: "首页",
          icon: "ice-home",
          link: "",
          children: []
        },
        {
          title: "分类",
          icon: "ice-category",
          link: "",
          children: [
            {
              name: "vue",
              link: "",
              icon: ""
            },
            {
              name: "js",
              link: "",
              icon: ""
            }
          ]
        },
        {
          title: "标签",
          icon: "ice-tag",
          link: "",
          children: []
        },
        {
          title: "时间线",
          icon: "ice-date",
          link: "",
          children: []
        },
        {
          title: "联系",
          icon: "ice-message",
          link: "",
          children: [
            {
              name: "GITHUB",
              link: "",
              icon: ""
            },
            {
              name: "GITEE",
              link: "",
              icon: ""
            }
          ]
        }
      ]
    };
  },
  watch: {
    keyword(newVal) {
      if (newVal === "" && this.oldKeyword !== "") {
        this.oldKeyword = "";
      }
    }
  },
  mounted() {
    /** 判断是否登录 */
    this.isLogin = this.$utils.isLogin();

    /** 点击任意元素关闭颜色选择器 */
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.isShowPicker = false;
      }
    });

    /** 添加顶部滚动进度条 */
    const pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollAvail = pageHeight - windowHeight;
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.$refs.scheduleBar.style.width = (scrollTop / scrollAvail) * 100 + "%";
    };

    /** 设置系统主题 */
    const localTheme = JSON.parse(getLocalStorage("my_theme"));
    if (localTheme && localTheme.length > 0) {
      this.defaultTheme = localTheme.find(item => item.id + 1).id;
      this.currentTheme(localTheme[0], localTheme[1], localTheme[2], localTheme[3], localTheme[4], localTheme[5]);
    } else {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? this.currentTheme(dark[0], dark[1], otherDark[0], darkShadow[0], darkShadow[1], darkBorColor[0])
        : this.currentTheme(light[0], light[1], otherLight[0], lightShadow[0], lightShadow[1], lightBorColor[0]);
    }
  },
  methods: {
    /** 切换主题 */
    toggleTheme(index) {
      this.defaultTheme = index;
      const curTheme = this.themeIf(index);
      switch (index) {
        case 0:
        case 2:
          this.currentTheme(curTheme[0], curTheme[1], curTheme[2], curTheme[3], curTheme[4], curTheme[5]);
          break;
        case 1:
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? this.currentTheme(curTheme[0], curTheme[1], curTheme[2], curTheme[3], curTheme[4], curTheme[5])
            : this.currentTheme(curTheme[0], curTheme[1], curTheme[2], curTheme[3], curTheme[4], curTheme[5]);
          break;
      }
      curTheme.push({ id: index });
      setLocalStorage("my_theme", JSON.stringify(curTheme));
    },
    /** 主题判断换 */
    themeIf(index) {
      let themeBgColor, themeTextColor, themeOterBgc, curShadow, curShadowHov, curBorColor;
      switch (index) {
        case 0:
          themeBgColor = dark[0];
          themeTextColor = dark[1];
          themeOterBgc = otherDark[0];
          curShadow = darkShadow[0];
          curShadowHov = darkShadow[1];
          curBorColor = darkBorColor[0];
          break;
        case 2:
          themeBgColor = light[0];
          themeTextColor = light[1];
          themeOterBgc = otherLight[0];
          curShadow = lightShadow[0];
          curShadowHov = lightShadow[1];
          curBorColor = lightBorColor[0];
          break;
        default:
          themeBgColor = dark[0];
          themeTextColor = dark[1];
          themeOterBgc = otherDark[0];
          curShadow = darkShadow[0];
          curShadowHov = darkShadow[1];
          curBorColor = darkBorColor[0];
          break;
      }
      return [ themeBgColor, themeTextColor, themeOterBgc, curShadow, curShadowHov, curBorColor ];
    },
    /** 设置当前主题为 */
    currentTheme(curThemeBgc, curThemeColor, curOterBgc, curShadow, curShadowHov, curBorColor) {
      document.documentElement.style.setProperty("--my-cur-default-theme-bgc", curThemeBgc);
      document.documentElement.style.setProperty("--my-cur-default-theme-color", curThemeColor);
      document.documentElement.style.setProperty("--my-cur-default-theme-oter", curOterBgc);
      document.documentElement.style.setProperty("--my-cur-default-theme-shadow", curShadow);
      document.documentElement.style.setProperty("--my-cur-default-theme-shadow-hover", curShadowHov);
      document.documentElement.style.setProperty("--my-cur-default-theme-bor-color", curBorColor);
    },
    /** 搜索 */
    enterSearch(e) {
      if (e.keyCode === 13) {
        if (this.keyword === "" && this.oldKeyword === "") {
          this.$utils.toast("warn", "输入内容为空");
          return;
        }
        if (this.keyword !== "") {
          this.oldKeyword = this.keyword;
        }
        console.log(this.keyword);
      }
    },
    showLoginModel() {
      this.active = 1;
      this.$loginModel.show();
    },
    outLogin() {
      this.$cookies.remove("is_login");
      if (!this.$cookies.get("is_login")) {
        this.$utils.toast("success", "登出成功");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/css/common/header.less";
</style>
