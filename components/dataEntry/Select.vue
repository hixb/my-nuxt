<script generic="T" lang="ts" setup>
interface IProps {
  disabled?: boolean
}
withDefaults(defineProps<IProps>(), {
  disabled: false,
})

const list = reactive([
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
  { name: 6, value: 6 },
  { name: 7, value: 7 },
  { name: 8, value: 8 },
  { name: 9, value: 9 },
  { name: 10, value: 10 },
  { name: 11, value: 11 },
  { name: 12, value: 12 },
  { name: 13, value: 13 },
])

const currentSelect = ref<Record<string, any>>({})
const isOpen = ref(false)

const useSelectedRef = ref<HTMLDivElement | null>()

onClickOutside(useSelectedRef, () => isOpen.value = false)

const useSelectListBoxRef = ref<HTMLUListElement | null>()
const scrollPosition = ref<'top' | 'center' | 'bottom'>('top')

function handleScroll() {
  if (!useSelectListBoxRef.value)
    return

  scrollPosition.value = useSelectListBoxRef.value?.scrollTop === 0
    ? 'top'
    : useSelectListBoxRef.value?.scrollTop + useSelectListBoxRef.value?.clientHeight === useSelectListBoxRef.value?.scrollHeight
      ? 'bottom'
      : 'center'
}

function selectItem(item: any) {
  const name = currentSelect.value?.name
  if (name && name === item.name) {
    currentSelect.value = {}
    return
  }

  currentSelect.value = item
  isOpen.value = false
}
</script>

<template>
  <div
    ref="useSelectedRef"
    :class="disabled ? 'opacity-80 !cursor-no-drop' : ''"
    class="w-64 h-11 shadow-[0_0_25px_rgba(0,0,0,.07)] bg-[var(--my-box-bg)] rounded-lg cursor-pointer px-3 flex items-center justify-between relative mb-52 border border-[var(--my-border-color)]"
    @click="() => { !disabled ? isOpen = !isOpen : null }"
  >
    <span
      :class="[
        !currentSelect?.name && isOpen ? '-translate-y-2.5 text-xs font-normal' : '',
        !currentSelect?.name ? 'text-[var(--my-special-danger)] opacity-80' : 'text-[var(--my-special-color)]',
      ]"
      class="truncate select-none text-[13px] font-bold transition-[var(--my-theme-trans2)]"
    >
      {{ !!!currentSelect?.name ? "No choice" : currentSelect.name }}
    </span>
    <SvgIcon
      :class="[isOpen ? 'rotate-180' : '', disabled ? 'opacity-80 !cursor-no-drop' : '']"
      :is-open-hover="false"
      :overall-size="15"
      :size="15"
      class="mr-1"
      icon="arrow/arrow-down"
    />

    <Transition name="scale">
      <ul
        v-if="isOpen"
        ref="useSelectListBoxRef"
        :data-bottom-scroll="scrollPosition === 'bottom'"
        :data-center-scroll="scrollPosition === 'center'"
        :data-top-scroll="scrollPosition === 'top'"
        class="select-list-box absolute left-0 w-full top-12 p-3 bg-[var(--my-box-bg)] border border-[var(--my-border-color)] rounded-lg overflow-hidden max-h-[183px] overflow-y-auto data-[top-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_32px),transparent)] data-[bottom-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_32px),transparent)] data-[center-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_32px,#000_calc(100%_-_32px),transparent)]"
        @scroll="handleScroll"
      >
        <li
          v-for="item in list"
          :key="item.value"
          class="px-2 h-8 flex items-center hover:bg-[var(--my-darkT)] hover:opacity-80 rounded-lg justify-between"
          @click.stop="selectItem(item)"
        >
          <span
            :class="item.value === currentSelect.value ? 'text-[var(--my-special-color)]' : ''"
            class="truncate text-[12px] font-normal"
          >
            {{ item.name }}
          </span>
          <SvgIcon
            v-if="item.value === currentSelect.value"
            :is-open-hover="false"
            :overall-size="13"
            :size="13"
            :special="item.value === currentSelect.value"
            icon="arrow/hook"
          />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.select-list-box::-webkit-scrollbar {
  width: 0;
}

.scale-enter-active {
  animation: transition-scale .2s;
}

.scale-leave-active {
  animation: transition-scale .2s reverse;
}

@keyframes transition-scale {
  0% {
    transform: scale(.5);
    transform-origin: top center;
  }

  100% {
    transform: scale(1);
    transform-origin: top center;
  }
}
</style>
