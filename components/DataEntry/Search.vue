<script lang="ts" setup>
import { ref, watch } from "#imports";

/** 更新关键字 */
type updateKeywordProps = {
  (e: "updateKeyword", val: string | number): void
}

const updateKeywordEmit = defineEmits<updateKeywordProps>();

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  noContentToast?: string
  showClearBth?: boolean
}>(), {
  width: "240px",
  height: "36px",
  noContentToast: "搜索内容为空",
  showClearBth: false
});

const keyword = ref<string | number>("");
const oldKeyword = ref<string | number>("");
const clearBtnStatus = ref<boolean>(false);

watch(keyword, (newVal: string | number) => {
  updateKeywordEmit("updateKeyword", newVal);
  !newVal && oldKeyword ? oldKeyword.value = "" : props.showClearBth && (clearBtnStatus.value = props.showClearBth);
});


/** 搜索 */
const findModel = () => {
  if (keyword.value == "" && oldKeyword.value == "") {
    props.noContentToast && console.log(props.noContentToast);
    return;
  }
  keyword.value && (oldKeyword.value = keyword.value);
};
</script>

<template>
  <section class="search-wrap-ipt">
    <div class="search-btn" @click="findModel">
      <GlobalSvgIcon :is-open-hover="false" icon="search/search" />
    </div>
    <input
      v-model.trim="keyword"
      :placeholder="$t('header.header-input-text')"
      type="text"
      @keypress="+$event.keyCode === 13 && findModel()"
    />
    <div v-if="String(keyword).length > 0 && clearBtnStatus" class="btn-clear" @click="keyword.value = ''">
      <GlobalSvgIcon :is-open-hover="false" icon="essetional/close-square" />
    </div>
  </section>
</template>

<style lang="scss">
.search-wrap-ipt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  padding: 0 14px;
  background-color: var(--my-theme-darkT);
  border-radius: 18px;
  transition: var(--my-theme-trans3);
  width: v-bind("props.width");
  height: v-bind("props.height");

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
