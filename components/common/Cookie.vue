<template>
  <div :class="['cookie', {'is-show-cookie-popup': isShowCookiePopup}]">
    <div class="cookie-img"></div>
    <p class="content">
      我们使用 cookie 来提供更好的用户体验。
      <a href="https://policies.google.com/privacy?hl=en-US" target="_blank">
        了解隐私政策
      </a>
    </p>
    <div class="footer-area">
      <span @click="disagree">
        不接受
      </span>
      <vs-button success flat @click="agree">
        接受
      </vs-button>
    </div>
  </div>
</template>

<script>
import { getLocalStorage, setLocalStorage } from "@/plugins/utils";

export default {
  name: "Cookie",
  data() {
    return {
      isShowCookiePopup: false
    };
  },
  mounted() {
    console.log(getLocalStorage("whether-to-accept-cookies"));

    if (!parseInt(getLocalStorage("whether-to-accept-cookies"))) {
      this.isShowCookiePopup = true;
    }
  },
  methods: {
    agree() {
      this.setStorage(1);
    },
    disagree() {
      this.setStorage(0);
    },
    setStorage(num) {
      setLocalStorage("whether-to-accept-cookies", num);
      this.isShowCookiePopup = false;
    }
  }
};
</script>

<style scoped lang="less">
.cookie {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 300px;
  height: 180px;
  background-color: var(--my-theme-popup-bg);
  box-shadow: var(--my-cur-default-theme-shadow);
  z-index: 5;
  border-radius: 8px;
  padding: 50px 30px 24px;
  .trans;
  .hide-opa-vis;
  transform: translatey(-10px);
  transition: all 0.4s ease;

  .cookie-img {
    width: 64px;
    height: 64px;
    background-image: url(~assets/images/cookie.svg);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
  }

  .content {
    color: var(--my-theme-color);
    line-height: 26px;

    a {
      color: var(--my-theme-color);
      text-decoration: underline;
    }
  }

  .footer-area {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-around;

    span, button {
      color: var(--my-theme-color);
    }

    span {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      box-shadow: none;
    }

  }
}

.is-show-cookie-popup {
  .trans;
  .show-opa-vis;
  transform: translatey(10px);
  transition: all 0.4s ease;
}
</style>
