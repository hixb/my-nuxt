<script lang="ts" setup>
import { ref, watch } from "#imports";

/** 更新关键字 */
type updateKeywordProps = {
  (e: "updateKeyword", val: string | number): void
}

// TODO: 解构`props`会导致值失去反应性
const { width, height, noContentToast, showClearBth } = withDefaults(defineProps<{
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

watch(keyword, (newVal, oldValue) => {
  updateKeywordEmit("updateKeyword", newVal);
  if (newVal == "" && oldKeyword) {
    oldKeyword.value = "";
  } else {
    if (showClearBth) {
      clearBtnStatus.value = showClearBth;
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
    if (noContentToast) {
      console.log(noContentToast);
    }
    return;
  }
  if (keyword.value != "") {
    oldKeyword.value = keyword.value;
  }
};

/** 回车搜索 */
const enterSearch = (e: any) => {
  if (e["keyCode"] == 13) {
    findModel();
  }
};
</script>

<template>
  <div :style="{width: width, height: height}" class="search-wrap-ipt">
    <div class="search-btn" @click="findModel">
      <SvgIcon :is-open-hover="false" icon="search/search" />
    </div>
    <input v-model.trim="keyword" :placeholder="$t('header-input-text')" type="text" @keypress="enterSearch" />
    <div v-if="keyword.length > 0 && clearBtnStatus" class="btn-clear" @click="clearInput">
      <SvgIcon :is-open-hover="false" icon="essetional/close-square" />
    </div>
  </div>
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
