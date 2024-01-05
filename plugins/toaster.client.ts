import type * as Vue from 'vue'
import type { ToastSpace } from '~/types/toaster'
import { SiteSpaceEnum, ToastSpaceEnum } from '~/types/enum'
import { FeedbackToast } from '#components'

const PARENT_VARIABLE = 'v-toaster'

export default defineNuxtPlugin(() => {
  const toasterInstance = ref<Vue.ComponentInternalInstance | null>(null)

  return {
    provide: {
      toast: {
        open(options: ToastSpace.Prop): Partial<ToastSpace.ActiveToast> {
          const $root = toasterInstance.value?.proxy?.$root as (ToastSpace.ActiveToast & Vue.ComponentInternalInstance) | null | undefined

          if ($root)
            $root.dismiss()

          const propsData = Object.assign({}, options)
          const instance = createComponent(FeedbackToast, propsData, document.body, PARENT_VARIABLE)

          toasterInstance.value = instance as any

          // Get all elements with the specified class name
          const elements = document.querySelectorAll(`.${PARENT_VARIABLE}`)

          // Remove all elements except the last one
          for (let i = 0; i < elements.length - 1; i++)
            elements[i].parentNode?.removeChild(elements[i])

          return {
            dismiss: $root?.dismiss,
          }
        },
        success(message: string, options?: ToastSpace.Prop) {
          return this.open(Object.assign({
            type: SiteSpaceEnum.SiteType.SUCCESS,
            message,
          }, options))
        },
        danger(message: string, options?: ToastSpace.Prop) {
          return this.open(Object.assign({
            type: SiteSpaceEnum.SiteType.DANGER,
            message,
          }, options))
        },
        waring(message: string, options?: ToastSpace.Prop) {
          return this.open(Object.assign({
            type: SiteSpaceEnum.SiteType.WARNING,
            message,
          }, options))
        },
        system(message: string, options?: ToastSpace.Prop) {
          return this.open(Object.assign({
            type: ToastSpaceEnum.ToastType.SYSTEM,
            message,
          }, options))
        },
      },
    },
  }
})
