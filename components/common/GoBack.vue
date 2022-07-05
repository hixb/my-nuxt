<template>
  <transition name="slide-fade">
    <div v-if="isShowBackBtn" class="go-back" @click="goBack">
      <i class="isax isax-airplane"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GoBack",
  data() {
    return {
      isShowBackBtn: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isShowBackBtn = window.scrollY >= 1000;
    });
  },
  methods: {
    goBack() {
      this.$utils.scrollEaseOut(0);
    }
  },
};
</script>

<style scoped lang="less">
.go-back {
  .pof;
  bottom: 100px;
  right: 100px;
  .area(40px, 40px);
  .flex;
  .flex-ali-center;
  .flex-jus-con-cen;
  .box-s(var(--my-cur-default-theme-shadow));
  .bdr(5px);
  .cursor(pointer);

  i {
    color: var(--my-bright-active-theme-color);
    .fz(25px);
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-30px);
  .opa(0);
}
</style>
