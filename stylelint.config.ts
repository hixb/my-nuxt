module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
  ],
  rules: {
    // Specify indentation.
    indentation: 2,
    // Disallow unknown at-rules.
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["mixin", "extend", "content", "include"],
      },
    ],
    // Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
    "no-descending-specificity": null,
    // Disallow empty sources.
    "no-empty-source": null,
    // Disallow unknown pseudo-class selectors.
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export"],
      },
    ],
    // Disallow unknown properties.
    "property-no-unknown": null,
    // Disallow /*-comments.
    "scss/comment-no-loud": true,
    // Disallow empty comments.
    "scss/comment-no-empty": true,
  },
  overrides: [
    {
      files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
      extends: ["stylelint-config-recommended"],
      rules: {
        "keyframes-name-pattern": null,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            ignorePseudoClasses: ["deep", "global"],
          },
        ],
        "selector-pseudo-element-no-unknown": [
          true,
          {
            ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
          },
        ],
      },
    },
  ],
  ignoreFiles: ["**/*.js", "**/*.ts"],
};
