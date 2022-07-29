<template>
  <div class="login">
    <vs-dialog v-model="showLogin" blur>
      <template #header>
        <h4 class="not-margin">
          登录
        </h4>
      </template>
      <div class="con-form">
        <vs-input v-model="loginForm.username" placeholder="用户名">
          <template #icon>
            <i class="iconfont ice-account"></i>
          </template>
        </vs-input>
        <vs-input v-model="loginForm.password" type="password" placeholder="密码" @keyup.enter="login">
          <template #icon>
            <i class="iconfont ice-lock"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="login">
            登录
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import FetchData from "@/api/users";

export default {
  name: "Login",
  data() {
    return {
      showLogin: false,
      loginForm: {
        username: "",
        password: "",
      }
    };
  },
  watch: {
    showLogin(newVal) {
      if (!newVal) {
        this.resetForm();
      }
    }
  },
  methods: {
    show() {
      this.showLogin = true;
    },
    hide() {
      this.showLogin = false;
    },
    async login() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$utils.toast("warn", "请输入用户名和密码");
        return;
      }

      const req = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };
      await FetchData.login(req).then(res => {
        if (res.status === 0) {
          this.$utils.toast("success", "登录成功");
          this.hide();
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          this.$utils.toast("danger", res.message);
        }
      }).catch(err => {
        console.log(err);
        this.$utils.toast("danger", JSON.stringify(err));
      });
    },
    resetForm() {
      this.loginForm = {
        username: "",
        password: "",
      };
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .vs-dialog {
  .bgc(var(--my-cur-default-theme-bgc));

  header {
    h4 {
      .color(var(--my-cur-default-theme-color));
    }
  }

  .vs-dialog__close {
    .bd(1px, solid, var(--my-cur-default-theme-bor-color));

    i {
      &:before, &:after {
        .bgc(var(--my-cur-default-theme-color));
      }
    }
  }

  .vs-input-content {
    &:first-child {
      .mt(20px);
    }

    input {
      .area-w(100%);
      .bd(1px, solid, var(--my-cur-default-theme-bor-color));
      .bgc(var(--my-cur-default-theme-bgc));
      .color(var(--my-cur-default-theme-color));
    }

    label {
      .color(var(--my-cur-default-theme-color));
    }

    .vs-input__icon {
      .bd(1px, solid, var(--my-cur-default-theme-bor-color));
      .bd-r(0, none, transparent);

      .bgc(var(--my-cur-default-theme-bgc));
    }
  }

  .vs-button {
    .mt(10px);
    .bgc(var(--my-bright-active-theme-color));
    .color(var(--my-cur-default-theme-color));

    &:hover {
      box-shadow: 0 10px 20px -10px rgba(var(--my-bright-theme-color), 1);
    }
  }
}
</style>
