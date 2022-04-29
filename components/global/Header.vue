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
        <i class="iconfont reco-color"></i>
        <div class="color-picker-menu">
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
        <vs-input
          v-model="keyword"
          type="search"
        />
      </div>
      <!--      <div class="nav-links"></div>-->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      keyword: '',
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
      defaultTheme: 1
    }
  },
  mounted () {
    let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDarkMode) {
      const curTheme = this.themeIf()
      document.documentElement.style.setProperty('--my-default-theme-dark-bgc', curTheme[0])
      document.documentElement.style.setProperty('--my-default-theme-dark-color', curTheme[1])
      document.documentElement.style.setProperty('--my-default-theme-light-bgc', '')
      document.documentElement.style.setProperty('--my-default-theme-light-color', '')
    }
  },
  methods: {
    toggleTheme (index) {
      this.defaultTheme = index
      const curTheme = this.themeIf()

      if (index === 0) {
        document.documentElement.style.setProperty('--my-default-theme-light-bgc', curTheme[0])
        document.documentElement.style.setProperty('--my-default-theme-light-color', curTheme[1])

        document.documentElement.style.setProperty('--my-default-theme-dark-bgc', '')
        document.documentElement.style.setProperty('--my-default-theme-dark-color', '')
      } else if (index === 1) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.style.setProperty('--my-default-theme-dark-bgc', curTheme[0])
          document.documentElement.style.setProperty('--my-default-theme-dark-color', curTheme[1])
          document.documentElement.style.setProperty('--my-default-theme-light-bgc', '')
          document.documentElement.style.setProperty('--my-default-theme-light-color', '')
        } else {
          document.documentElement.style.setProperty('--my-default-theme-light-bgc', curTheme[0])
          document.documentElement.style.setProperty('--my-default-theme-light-color', curTheme[1])
          document.documentElement.style.setProperty('--my-default-theme-dark-bgc', '')
          document.documentElement.style.setProperty('--my-default-theme-dark-color', '')
        }
      } else if (index === 2) {
        document.documentElement.style.setProperty('--my-default-theme-dark-bgc', curTheme[0])
        document.documentElement.style.setProperty('--my-default-theme-dark-color', curTheme[1])

        document.documentElement.style.setProperty('--my-default-theme-light-bgc', '')
        document.documentElement.style.setProperty('--my-default-theme-light-color', '')
      }
    },
    themeIf () {
      const dark = [
        'rgba(24, 24, 24)',
        'rgba(255, 255, 255, 0.8)'
      ]
      const light = [
        'rgba(255, 255, 255)',
        'rgba(44, 62, 80)'
      ]
      let themeBgColor, themeTextColor
      switch (this.defaultTheme) {
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/common/header.less";
</style>
