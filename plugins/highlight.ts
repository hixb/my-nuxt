import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'

// register languages
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('hl', {
    mounted(el) {
      el.querySelectorAll('pre')?.forEach((item: HTMLElement) => {
        hljs.highlightElement(item)

        // custom div wraps pre
        const div = document.createElement('div')
        div.className = 'code'
        div.setAttribute('data-language', (item.className.split(' ').pop() || '').split('-')[1] || '')
        item.parentNode!.insertBefore(div, item)
        div.appendChild(item)
      })
    },
  })
})

/**
 * Set code block area highlighting.
 */
export function themeVariety(isDark: boolean) {
  const codeStyle = {
    light: '.hljs{color:#2a2c2d;background:#f4f4f5;border:1px solid #e4e4e7;box-shadow:0 0 25px rgba(0,0,0,.07);}.hljs-comment,.hljs-quote{color:#676b79;}.hljs-params{color:#676b79}.hljs-attr,.hljs-punctuation{color:#2a2c2d}.hljs-char.escape_,.hljs-meta,.hljs-name,.hljs-operator,.hljs-selector-tag{color:#c56200}.hljs-deletion,.hljs-keyword{color:#d92792}.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-variable.language_{color:#cc5e91}.hljs-code,.hljs-formula,.hljs-property,.hljs-section,.hljs-subst,.hljs-title.function_{color:#3787c7}.hljs-addition,.hljs-bullet,.hljs-meta .hljs-string,.hljs-selector-class,.hljs-string,.hljs-symbol,.hljs-title.class_,.hljs-title.class_.inherited__{color:#0d7d6c}.hljs-attribute,.hljs-built_in,.hljs-doctag,.hljs-link,.hljs-literal,.hljs-meta .hljs-keyword,.hljs-number,.hljs-selector-id,.hljs-tag,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#7641bb}',
    dark: '.hljs{color:#e6e6e6;background:#18181b;border:1px solid #27272a;}.hljs-comment,.hljs-quote{color:#bbb;}.hljs-params{color:#bbb}.hljs-attr,.hljs-punctuation{color:#e6e6e6}.hljs-meta,.hljs-name,.hljs-selector-tag{color:#ff4b82}.hljs-char.escape_,.hljs-operator{color:#b084eb}.hljs-deletion,.hljs-keyword{color:#ff75b5}.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-variable.language_{color:#ff9ac1}.hljs-code,.hljs-formula,.hljs-property,.hljs-section,.hljs-subst,.hljs-title.function_{color:#45a9f9}.hljs-addition,.hljs-bullet,.hljs-meta .hljs-string,.hljs-selector-class,.hljs-string,.hljs-symbol,.hljs-title.class_,.hljs-title.class_.inherited__{color:#19f9d8}.hljs-attribute,.hljs-built_in,.hljs-doctag,.hljs-link,.hljs-literal,.hljs-meta .hljs-keyword,.hljs-number,.hljs-punctuation,.hljs-selector-id,.hljs-tag,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#ffb86c}',
  }

  const style = document.createElement('style')

  style.type = 'text/css'

  style.innerHTML = isDark ? codeStyle.dark : codeStyle.light;

  (document.getElementsByTagName('head') as any).item(0).appendChild(style)
}
