<script lang="ts" setup>
interface SvgProps {
  borderRadius?: string;
  isOpenHover?: boolean;
  icon: string;
  filled?: boolean;
  customizeClass?: string;
}

const props = withDefaults(defineProps<SvgProps>(), {
  // 半径
  borderRadius: "round",
  // 是否打开悬停
  isOpenHover: true,
  // 图标
  icon: "",
  // svg填充
  filled: false,
  // 自定义类名
  customizeClass: ""
});

const iconsImport: Record<string, () => Promise<Record<string, any>>> =
  import.meta.glob("assets/icons/**/**.svg", {
    as: "raw",
    eager: false
  });

const rawIcon = ref<Record<string, any>>(await checkSvgFn(props.icon));

watch(() => props.icon, async(newVal: string) => {
  newVal && (rawIcon.value = await checkSvgFn(newVal));
}, {
  immediate: true
});

!rawIcon.value && console.error(`[SvgIcon] Icon '${props.icon}' doesn't exist in 'assets/icons'`);

async function checkSvgFn(val: string) {
  const isFn = await iconsImport[`/assets/icons/${val}.svg`];

  return typeof isFn === "function" ? isFn() : isFn;
}
</script>

<template>
  <section
    :class="[
      'svg-pic w40px h40px flex items-center justify-center cursor-pointer',
      borderRadius,
      customizeClass,
      { 'open-hover': isOpenHover }
    ]"
  >
    <span :class="{ 'nuxt-icon--fill': !filled }" class="contents" v-html="rawIcon" />
  </section>
</template>

<style lang="scss">
.svg-pic {
  transition: var(--my-theme-trans2);

  svg {
    width: 20px;
    height: 20px;
  }
}

.open-hover {
  &:hover {
    transition: var(--my-theme-trans2);
    background-color: var(--my-theme-transB);

    svg * {
      stroke: var(--my-theme-special-color);
    }
  }
}
</style>
