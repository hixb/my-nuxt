<template>
  <header>
    <div class="center examplex">
      <vs-navbar v-model="active" center-collapsed>
        <template #left>
          <nuxt-link to="/">
            <h1>
              <img src="~/assets/images/logo.png" alt="logo">
            </h1>
          </nuxt-link>
        </template>
        <vs-navbar-item id="index" :active="active === 'index'">
          首页
        </vs-navbar-item>
        <vs-navbar-group>
          分类
          <template #items>
            <nuxt-link id="classification" to="/" :active="active === 'classification'">
              Guide
            </nuxt-link>
            <nuxt-link id="docs" to="/" :active="active === 'docs'">
              Documents
            </nuxt-link>
            <nuxt-link id="components" to="/" :active="active === 'components'">
              Components
            </nuxt-link>
          </template>
        </vs-navbar-group>
        <vs-navbar-group>
          标签
          <template #items>
            <vs-navbar-item id="classification" :active="active === 'classification'">
              Guide
            </vs-navbar-item>
            <vs-navbar-item id="docs" :active="active === 'docs'">
              Documents
            </vs-navbar-item>
            <vs-navbar-item id="components" :active="active === 'components'">
              Components
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <vs-navbar-group>
          联系
          <template #items>
            <vs-navbar-item id="classification" :active="active === 'classification'">
              Guide
            </vs-navbar-item>
            <vs-navbar-item id="docs" :active="active === 'docs'">
              Documents
            </vs-navbar-item>
            <vs-navbar-item id="components" :active="active === 'components'">
              Components
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <template #right>
          <vs-input
            color="#7d33ff"
            border
            type="search"
            placeholder="search"
            loading
          />
          <vs-button gradient @click="goLogin">
            LOGIN
          </vs-button>
          <vs-button gradient disabled>
            GET STARTED
          </vs-button>
        </template>
      </vs-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      active: 'index'
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  margin-bottom: 44px;

  h1 {
    width: 44px;
    height: 44px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  /deep/ .vs-navbar-content {
    border-bottom: 1px solid var(--my-disabled-theme-color);

    .vs-navbar__group__items {
      align-items: flex-start;
    }

    .vs-input-parent {
      margin-right: 20px;
    }
  }

  svg {
    width: 122px;
    height: 36px;
  }
}
</style>
