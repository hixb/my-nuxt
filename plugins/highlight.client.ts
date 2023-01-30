import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/gradient-light.css";

const theme: string[] = [
  "highlight.js/styles/an-old-hope.css",
  "highlight.js/styles/androidstudio.css",
  "highlight.js/styles/atom-one-dark.css",

  "highlight.js/styles/gradient-dark.css",
  "highlight.js/styles/gradient-light.css"
];


// register languages
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("hl", {
    mounted(el) {
      const elements = el.querySelectorAll("pre");
      elements.forEach((item: HTMLElement) => {
        hljs.highlightElement(item);
      });
    }
  });
});
