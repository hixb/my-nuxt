<template>
  <div class="expand-search">
    <vs-dialog v-model="isShowExpandSearch" blur>
      <div class="con-form">
        <div class="center content-inputs">
          <vs-input v-model="keyword" label-placeholder="输入关键字" />
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "ExpandSearch",
  data() {
    return {
      keyword: "",
      isShowExpandSearch: false
    };
  },
  mounted() {
    const _this = this;
    document.onkeydown = function(event) {
      const key = window.event.keyCode;
      if (key === 191) {
        _this.isShowExpandSearch = true;
      }
    };
  },
  methods: {}
};
</script>

<style scoped lang="less">
.expand-search {
  position: fixed;
  z-index: 100;

  /deep/ .vs-dialog {
    .bgc(var(--my-cur-default-theme-bgc));

    .vs-dialog__close {
      .bd(1px, solid, var(--my-cur-default-theme-bor-color));

      i {
        &:before, &:after {
          .bgc(var(--my-cur-default-theme-color));
        }
      }
    }

    /deep/ .vs-input-content {
      .con-form {
        > input {
          .area-w(100%);
          .bd(1px, solid, var(--my-cur-default-theme-bor-color));
          .bgc(var(--my-cur-default-theme-bgc));
          .color(var(--my-cur-default-theme-color));
        }

        > label {
          .color(var(--my-cur-default-theme-color));
        }
      }

    }
  }
}
</style>
