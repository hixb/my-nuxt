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
      <CommonSvgPic :is-open-hover="false">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          />
          <path
            class="set-svg-stroke" d="M22 22L20 20" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </CommonSvgPic>
    </div>
    <input v-model.trim="keyword" :placeholder="$t('header-input-text')" type="text" @keypress="enterSearch" />
    <div v-if="keyword.length > 0 && clearBtnStatus" class="btn-clear" @click="clearInput">
      <CommonSvgPic :is-open-hover="false">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.16992 14.8319L14.8299 9.17188" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M14.8299 14.8319L9.16992 9.17188" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </CommonSvgPic>
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
