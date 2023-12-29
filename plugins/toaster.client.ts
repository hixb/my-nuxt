import { type ComponentInternalInstance, h, render } from 'vue'
import { FeedbackToast } from '#components'

const PARENT_VARIABLE = 'v-toast--pending'

function createComponent(component: HTMLElement, props: any, parentContainer: HTMLElement, slots = {}) {
  const vNode = h(component, props, slots)
  const container = document.createElement('div')
  container.classList.add(PARENT_VARIABLE)
  parentContainer.appendChild(container)
  render(vNode, container)

  return vNode.component
}

export default defineNuxtPlugin(() => {
  const toasterInstance = ref<ComponentInternalInstance | null>(null)

  return {
    provide: {
      toast: {
        open(options: ToastSpace.Prop): ToastSpace.ActiveToast {
          if (toasterInstance.value)
            toasterInstance.value.ctx.$root?.dismiss()

          const propsData = Object.assign({}, options)
          const instance = createComponent(FeedbackToast, propsData, document.body)

          toasterInstance.value = instance

          // Get all elements with the specified class name
          const elements = document.querySelectorAll(`.${PARENT_VARIABLE}`)

          // Remove all elements except the last one
          for (let i = 0; i < elements.length - 1; i++)
            elements[i].parentNode.removeChild(elements[i])

          return {
            dismiss: instance!.ctx.dismiss,
          }
        },
        success(message: string, options?: ToastSpace.Prop) {
          return this.open(Object.assign({
            type: 'success',
            message,
          }, options))
        },
      },
    },
  }
})
