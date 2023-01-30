<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
import { ref, watchEffect } from "#imports";
import { fetchRoomList } from "~/server/api";

const user = useUserStore();
const isShowDialog = ref<boolean>(false);
const content = ref(`
  <div class="jaj">
  11
  <pre>
  <code class="javascript">
  import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/tomorrow-night-bright.css";
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
</code>
</pre>
</div>
`);

watchEffect(() => {
  user.setNewName("zhuxb");
});

// const showDialog = () => {
//   isShowDialog.value = true;
// };

function getData() {
  fetchRoomList();
}

getData();
</script>

<template>
  <NuxtLayout>
    <!--    <GeneralButton type="grb" @click="showDialog">-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <GeneralButton>-->
    <!--      hello-->
    <!--    </GeneralButton>-->
    <!--    <FeedbackDialog :visible="isShowDialog" @close="isShowDialog = false" />-->
    <DataEntryList />

    <div id="content" v-hl v-html="content"></div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
#content {
  code {
    font-size: 85%;
    padding: 2px 4px;
    background-color: #fff;
    border-radius: 3px;
  }

  img {
    max-width: 100%;
    display: block;
    margin: auto;
  }

  :deep(.hljs) {
    border-radius: 5px;
    padding: 1rem;
    margin: 0.5rem 0;
    background-color: var(--my-theme-content);
    line-height: 21px;
  }
}
</style>
