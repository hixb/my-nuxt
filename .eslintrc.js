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
    // Require or disallow semicolons instead of ASI
    semi: [2],
    // Disallow unnecessary escape characters
    "no-useless-escape": 0,
    // Disallow empty block statements
    "no-empty": 0,
    // Enforce the maximum number of attributes per line
    "vue/max-attributes-per-line": "off",
    // Disallow irregular whitespace
    "no-irregular-whitespace": ["error", {
      skipStrings: true,
      skipComments: true,
      skipRegExps: true,
      skipTemplates: true,
    }],
    // Disallow unused variables
    "no-unused-vars": ["error", {
      vars: "all",
      args: "none",
      ignoreRestSiblings: false
    },],
    // Disallow unused variable definitions of v-for directives or scope attributes
    "vue/no-unused-vars": "off",
    // Enforce self-closing style
    "vue/html-self-closing": ["error", {
      html: { void: "any", normal: "any", component: "any", },
      svg: "always",
      math: "always",
    }],
    // Enforce consistent spacing inside braces
    "object-curly-spacing": ["error", "always"],
    // Enforce the consistent use of either backticks, double, or single quotes
    "quotes": [1, "double"],
    // Enforce consistent spacing before function definition opening parenthesis
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "never"
    }],
    // Require component names to be always multi-word
    "vue/multi-word-component-names": 0,
    // Require a line break before and after the contents of a singleline element
    "vue/singleline-html-element-content-newline": "off",
    // Require a line break before and after the contents of a multiline element
    "vue/multiline-html-element-content-newline": "off",
    // Disallow the use of debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    // Enforce order of component top-level elements
    "vue/component-tags-order": ["error", {
      "order": [["script", "template"], "style"]
    }],
    // Enforce specific casing for custom event name
    "vue/custom-event-name-casing": ["error", "camelCase", { "ignores": [] }],
    // Enforce order of `defineEmits` and `defineProps` compiler macros
    "vue/define-macros-order": ["error", {
      "order": ["defineEmits", "defineProps"]
    }],
    // Disallow parsing errors in `<template>`
    "vue/no-parsing-error": ["error", {
      "abrupt-closing-of-empty-comment": true,
      "absence-of-digits-in-numeric-character-reference": true,
      "cdata-in-html-content": true,
      "character-reference-outside-unicode-range": true,
      "control-character-in-input-stream": true,
      "control-character-reference": true,
      "eof-before-tag-name": true,
      "eof-in-cdata": true,
      "eof-in-comment": true,
      "eof-in-tag": true,
      "incorrectly-closed-comment": true,
      "incorrectly-opened-comment": true,
      "invalid-first-character-of-tag-name": true,
      "missing-attribute-value": true,
      "missing-end-tag-name": true,
      "missing-semicolon-after-character-reference": true,
      "missing-whitespace-between-attributes": true,
      "nested-comment": true,
      "noncharacter-character-reference": true,
      "noncharacter-in-input-stream": true,
      "null-character-reference": true,
      "surrogate-character-reference": true,
      "surrogate-in-input-stream": true,
      "unexpected-character-in-attribute-name": true,
      "unexpected-character-in-unquoted-attribute-value": true,
      "unexpected-equals-sign-before-attribute-name": true,
      "unexpected-null-character": true,
      "unexpected-question-mark-instead-of-tag-name": true,
      "unexpected-solidus-in-tag": true,
      "unknown-named-character-reference": true,
      "end-tag-with-attributes": true,
      "duplicate-attribute": true,
      "end-tag-with-trailing-solidus": true,
      "non-void-html-element-start-tag-with-trailing-solidus": false,
      "x-invalid-end-tag": true,
      "x-invalid-namespace": true
    }],
    // Allow the `any` type
    "@typescript-eslint/no-explicit-any": "off"
  }
};
