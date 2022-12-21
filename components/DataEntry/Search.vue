<script lang="ts" setup>
import { ref, watch } from "#imports";

/** 更新关键字 */
type updateKeywordProps = {
  (e: "updateKeyword", val: string | number): void
}

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  noContentToast?: string
  showClearBth?: boolean
}>(), {
  width: "",
  height: "",
  noContentToast: "搜索内容为空",
  showClearBth: false
});

const keyword = ref<string | number>("");
const oldKeyword = ref<string | number>("");
const clearBtnStatus = ref<boolean>(false);

const updateKeywordEmit = defineEmits<updateKeywordProps>();

watch(keyword, (newVal: string | number) => {
  updateKeywordEmit("updateKeyword", newVal);
  if (newVal == "" && oldKeyword) {
    oldKeyword.value = "";
  } else {
    if (props.showClearBth) {
      clearBtnStatus.value = props.showClearBth;
    }
  }
});

/** 清空输入框 */
const clearInput = () => {
  keyword.value = "";
};

/** 搜索 */
const findModel = () => {
  if (keyword.value == "" && oldKeyword.value == "") {
    if (props.noContentToast) {
      console.log(props.noContentToast);
    }
    return;
  }
  if (keyword.value != "") {
    oldKeyword.value = keyword.value;
  }
};

/** 回车搜索 */
const enterSearch = (e: KeyboardEvent) => {
  if (e.keyCode == 13) {
    findModel();
  }
};
</script>

<template>
  <section :style="{width: props.width, height: props.height}" class="search-wrap-ipt">
    <div class="search-btn" @click="findModel">
      <GlobalSvgIcon :is-open-hover="false" icon="search/search" />
    </div>
    <input v-model.trim="keyword" :placeholder="$t('header.header-input-text')" type="text" @keypress="enterSearch" />
    <div v-if="keyword.length > 0 && clearBtnStatus" class="btn-clear" @click="clearInput">
      <GlobalSvgIcon :is-open-hover="false" icon="essetional/close-square" />
    </div>
  </section>
</template>

<style lang="scss">
.search-wrap-ipt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
  height: 36px;
  line-height: 1;
  padding: 0 14px;
  background-color: var(--my-theme-darkT);
  border-radius: 18px;
  transition: var(--my-theme-trans3);

  &:hover {
    background-color: var(--my-theme-transB);
    transition: var(--my-theme-trans3);
  }

  input {
    width: calc(100% - 46px);
    background-color: transparent;
    height: 100%;
    color: var(--my-theme-color);
    transition: var(--my-theme-trans3);

    &::-webkit-input-placeholder {
      color: #bbb;
    }
  }

  .search-btn, .btn-clear {
    cursor: pointer;
  }
}
</style>
