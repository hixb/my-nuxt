<template>
  <div :class="['app', currentTheme]">
    <div class="app-box">
      <Header @themeToggle="themeToggle" />
      <main class="main">
        <Sidebar />
        <Nuxt />
        <!--      <GoBack />-->
      </main>
      <!--    <Footer />-->
    </div>
    <div class="video-bg">
      <video autoplay loop muted>
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4">
      </video>
    </div>
    <Cookie />
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Cookie from "@/components/common/Cookie";
import Sidebar from "@/components/common/Sidebar";
// import Footer from "@/components/common/Footer";
// import GoBack from "@/components/common/GoBack";

export default {
  components: {
    Sidebar,
    Cookie,
    Header
  },
  data() {
    return {
      currentTheme: "",
    };
  },
  methods: {
    themeToggle(val) {
      this.currentTheme = val ? "light-mode" : "";
    }
  }
};
</script>

<style scoped lang="less">

.app {
  * {
    .trans;
  }

  .app-box {
    .bgc(var(--my-theme-bg-color));
    .area(90%, 90vh);
    border-radius: 14px;
    backdrop-filter: blur(20px);
    .pof;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .trans;
    overflow: hidden;

    .main {
      padding-right: 30px;
      height: 94%;
      display: flex;
    }
  }
}

.video-bg {
  .pof;
  right: 0;
  top: 0;
  .area(100%, 100%);

  video {
    .area(100%, 100%);
    object-fit: cover;
  }
}


</style>
