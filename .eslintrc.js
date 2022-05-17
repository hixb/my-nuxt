module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      // 添加ES特性支持，使之能够识别ES6语法
      legacyDecorators: true,
      jsx: true,
      // modules: true,
    },
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended"
  ],
  // 校验 .vue 文件
  plugins: [
    "vue",
    // "prettier"
  ],
  // 自定义规则
  rules: {
    semi: [ 2 ],
    "no-console": "off",
    "no-useless-escape": 0,
    "no-empty": 0,
    "vue/max-attributes-per-line": "off",
    "no-irregular-whitespace": [
      "error",
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: false
      },
    ],
    "vue/no-unused-vars": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any",
          normal: "any",
          component: "any",
        },
        svg: "always",
        math: "always",
      }
    ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-curly-spacing": [ "error", "always" ],
    "quotes": [ 1, "double" ]
  }
};
