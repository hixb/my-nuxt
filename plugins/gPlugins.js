import Vue from "vue";
import Login from "~/components/common/Login";

// 登录框
const LoginPlugin = {};
LoginPlugin.install = function(_vue) {
  const loginConstrustor = _vue.extend(Login);
  const loginModel = new loginConstrustor();
  loginModel.$mount(window.document.createElement("div"));
  document.body.appendChild(loginModel.$el);
  _vue.prototype.$loginModel = loginModel;
};

const customPlugins = {
  LoginPlugin,
};

Object.keys(customPlugins).forEach(plugin => {
  Vue.use(customPlugins[plugin]);
});
