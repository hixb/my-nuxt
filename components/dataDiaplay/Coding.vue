<script setup lang="ts">
interface IProps {
  code?: string
  language?: 'TYPESCRIPT' |
  'JAVASCRIPT' |
  'HTML' |
  'CSS' |
  'BASH' |
  'SHELL' |
  'PYTHON' |
  'TEXT' |
  'NONE' |
  'NUXT' |
  'NEXT' |
  'VUE' |
  'REACT' |
  'SVELTE' |
  'ASTRO' |
  'EXPRESS' |
  'KOA' |
  'NEST'
}

const props = withDefaults(defineProps<IProps>(), {
  code: '<pre><code class="language-typescript">export const isRegExp = (arg: unknown): arg is RegExp = Object.prototype.toString.call(arg) === "[object RegExp]"</code></pre>',
  language: 'TYPESCRIPT',
})

const { withAnchor, toString } = useArticleProcessing(props.code)

const timer = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

function copy() {
  if (timer.value)
    return

  const { copy } = useClipboard({ source: toString })
  copy(toString)

  timer.value = setTimeout(() => {
    timer.value = undefined
    clearTimeout(timer.value)
  }, 2000)
}
</script>

<template>
  <section class="w-full rounded-lg bg-[var(--my-box-bg)] shadow-[0_10px_40px_rgba(0,0,0,.1)] p-5 my-8">
    <div class="flex justify-between items-center mb-4">
      <div class="text-lg font-bold">
        {{ language }}
      </div>
      <ul class="flex items-center justify-center">
        <li>
          <SvgIcon
            :icon="timer ? 'design-tools/copy-success' : 'design-tools/copy'"
            :size="18"
            :overall-size="42"
            @click="copy"
          />
        </li>
      </ul>
    </div>
    <div v-hl class="rounded-lg">
      <div v-html="withAnchor" />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
