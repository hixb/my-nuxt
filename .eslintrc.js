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
    sourceType: "module",
    ecmaFeatures: {
      // 添加ES特性支持, 使之能够识别ES6语法
      legacyDecorators: true,
      jsx: true,
      tsx: true
    },
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
  rules: {
    semi: [2],
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
    "object-curly-spacing": ["error", "always"],
    "quotes": [1, "double"],
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "never"
    }],
    "vue/multi-word-component-names": 0, // 关闭vue文件和组件命名校验
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
  }
};
