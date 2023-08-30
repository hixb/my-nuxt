<script setup lang="ts">
interface IProps {
  content: string
}

const props = withDefaults(defineProps<IProps>(), {
  content: '',
})

const { directoryArray } = useArticleProcessing(props.content)

const showDirectory = ref(false)

const useDirectoryRef = ref<HTMLElement | null>(null)

onClickOutside(useDirectoryRef, () => showDirectory.value = false)

function scrollToSection(id: string) {
  const el = document.querySelector(id)

  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <nav ref="useDirectoryRef" class="fixed top-[100px] max-md:top-[105px] right-0 z-[50]">
    <div
      class="fixed top-[100px] max-md:top-[105px] right-0 bg-[var(--my-box-bg)] shadow-[0_0_20px_0_rgba(0,0,0,.2)] rounded-[20px_0_0_20px] cursor-pointer"
      @click="showDirectory = true"
    >
      <svg class="rad" viewBox="0 0 160 160">
        <path d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z" transform="translate(0 10)" />
      </svg>
      <span class="icon-dir">
        <SvgIcon icon="emails-message/direct" :is-open-hover="false" />
      </span>
      <svg class="rad in" viewBox="0 0 160 160">
        <path d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z" transform="translate(0 10)" />
      </svg>
    </div>
    <div :class="[showDirectory ? '!right-0 max-2md:!right-5' : '!-right-72']" class="directory-listing">
      <div class="h-12 flex items-center justify-between px-2.5">
        <span class="py-4 px-2.5">目录</span>
        <SvgIcon
          icon="essetional/close-square"
          :size="40"
          :overall-size="40"
          :is-open-hover="false"
          @click="showDirectory = false"
        />
      </div>
      <div class="py-5 overflow-y-scroll overflow-x-hidden">
        <ol class="pl-10 pr-2">
          <li
            v-for="(item, index) in directoryArray"
            :key="item.id"
            :data-marker="`${index + 1}、`"
            :data-content="`#${item.processedID}`"
            class="relative text-sm before:content-[attr(data-marker)] before:absolute before:top-0 before:-left-5 leading-6"
          >
            <span
              class="line-clamp-2 transition-[var(--my-theme-trans2)] cursor-pointer hover:underline hover:opacity-80"
              @click="scrollToSection(`#${item.processedID}`)"
              v-html="item.id"
            />
          </li>
        </ol>
      </div>
    </div>
    <div
      class="blur-backdrop invisible opacity-0 transition-[var(--my-theme-trans2)] max-md:z-10"
      :class="[
        showDirectory ? 'max-2md:!opacity-100 max-2md:!visible transition-[var(--my-theme-trans2)]' : '',
      ]"
      @click="showDirectory = false"
    />
  </nav>
</template>

<style scoped lang="scss">
.rad {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -2px;
  top: -19px;
  fill: var(--my-box-bg);
  transform: rotate(92deg);
  transition: inherit;

  * {
    stroke: var(--my-box-bg);
  }

  &.in {
    top: auto;
    bottom: -19px;
    transform: rotate(-2deg);
  }
}

.icon-dir {
  &:before {
    content: '';
    z-index: 1;
    display: block;
    width: 15px;
    height: 15px;
    background: var(--my-box-bg);
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 9px;
    transition: var(--my-trans1);
  }

  &:after {
    content: '';
    z-index: 1;
    display: block;
    width: 10px;
    height: 10px;
    background: var(--my-special-color);
    border-radius: 50%;
    position: absolute;
    top: 7px;
    left: 12px;
    animation: flash 2.7s infinite;
  }

  @apply flex items-center justify-center w-[45px] h-[40px] rounded-[20px_0_0_20px] shadow-[0_5px_20px_0_rgba(0,0,0,.1)]
}

.directory-listing {
  transition: all .3s ease;

  a {
    transition: color 0.3s;
    color: #333;
    text-decoration: none;
  }

  @apply
  fixed
  top-16
  w-72
  h-[calc(100vh-64px)]
  border-l
  border-[var(--my-border-color)]
  bg-[var(--my-box-bg)]
  -right-72
  z-30
  max-2md:rounded-3xl
  max-2md:h-[calc(100vh-60px)]
  max-2md:top-[30px]
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: .3;
  }
}
</style>
