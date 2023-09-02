<script lang="ts" setup>
interface IProps {
  code?: string
  language?: 'TypeScript' |
  'JavaScript' |
  'Html' |
  'Css' |
  'Bash' |
  'Shell' |
  'Python' |
  'Text' |
  'Node' |
  'Nuxt' |
  'Next' |
  'Vue' |
  'React' |
  'Svelte' |
  'Astro' |
  'Express' |
  'Koa' |
  'Nest'
}

const props = withDefaults(defineProps<IProps>(), {
  code: '<pre><code class="language-typescript">export const isRegExp = (arg: unknown): arg is RegExp = Object.prototype.toString.call(arg) === "[object RegExp]"</code></pre>',
  language: 'TypeScript',
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
            :overall-size="42"
            :size="18"
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

<style lang="scss" scoped>

</style>
