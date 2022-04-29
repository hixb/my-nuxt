<template>
  <header>
    <nuxt-link to="/">
      <h1>
        <img src="~/assets/images/logo.png" alt="logo">
        <span>dawnIceZhu's Notes</span>
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
      </div>
    </div>
  </header>
</template>

<script>
import { getLocalStorage, setLocalStorage } from '@/plugins/utils'

const dark = ['rgba(24, 24, 24)', 'rgba(255, 255, 255, 0.8)']
const light = ['rgba(255, 255, 255)', 'rgba(44, 62, 80)']

export default {
  name: 'Header',
  directives: {
    focus: {
      update: function (el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  data () {
    return {
      keyword: '',
      oldKeyword: '',
      colorPickerSelect: [
        {
          id: 0,
          name: 'dark'
        },
        {
          id: 1,
          name: 'auto'
        },
        {
          id: 2,
          name: 'light'
        },
      ],
      defaultTheme: 1,
      isShowPicker: false,
      focusState: false,
      navLink: [
        {
          title: '首页',
          icon: 'ice-home',
          link: '',
          children: []
        },
        {
          title: '分类',
          icon: 'ice-category',
          link: '',
          children: [
            {
              name: 'vue',
              link: '',
              icon: ''
            },
            {
              name: 'js',
              link: '',
              icon: ''
            }
          ]
        },
        {
          title: '标签',
          icon: 'ice-tag',
          link: '',
          children: []
        },
        {
          title: '时间线',
          icon: 'ice-date',
          link: '',
          children: []
        },
        {
          title: '联系',
          icon: 'ice-message',
          link: '',
          children: [
            {
              name: 'GITHUB',
              link: '',
              icon: ''
            },
            {
              name: 'GITEE',
              link: '',
              icon: ''
            }
          ]
        }
      ]
    }
  },
  watch: {
    keyword (newVal) {
      if (newVal === '' && this.oldKeyword !== '') {
        this.oldKeyword = ''
      }
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.isShowPicker = false
      }
    })
    const localTheme = JSON.parse(getLocalStorage('my_theme'))

    localTheme && localTheme.length > 0
      ? this.currentTheme(localTheme[0], localTheme[1])
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? this.currentTheme(dark[0], dark[1])
        : this.currentTheme(light[0], light[1])
  },
  methods: {
    toggleTheme (index) {
      this.defaultTheme = index
      const curTheme = this.themeIf(index)
      switch (index) {
        case 0:
        case 2:
          this.currentTheme(curTheme[0], curTheme[1])
          break
        case 1:
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? this.currentTheme(curTheme[0], curTheme[1])
            : this.currentTheme(curTheme[0], curTheme[1])
          break
      }
      setLocalStorage('my_theme', JSON.stringify(curTheme))
    },
    themeIf (index) {
      let themeBgColor, themeTextColor
      switch (index) {
        case 0:
          themeBgColor = dark[0]
          themeTextColor = dark[1]
          break
        case 2:
          themeBgColor = light[0]
          themeTextColor = light[1]
          break
        default:
          themeBgColor = dark[0]
          themeTextColor = dark[1]
          break
      }
      return [themeBgColor, themeTextColor]
    },
    currentTheme (curThemeBgc, curThemeColor) {
      document.documentElement.style.setProperty('--my-cur-default-theme-bgc', curThemeBgc)
      document.documentElement.style.setProperty('--my-cur-default-theme-color', curThemeColor)
    },
    enterSearch (e) {
      if (e.keyCode === 13) {
        if (this.keyword === '' && this.oldKeyword === '') {
          console.log(1)
          return
        }
        if (this.keyword !== '') {
          this.oldKeyword = this.keyword
        }
        console.log(this.keyword)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/common/header.less";
</style>
