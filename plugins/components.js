import Vue from "vue";

function changeComponentName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 循环注册组件
const requireComponent = require.context("~/components/global", false, /\.vue$/);
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName);
  const componentName = changeComponentName(
    fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")
  );
  Vue.component(componentName, config.default || config);
});
