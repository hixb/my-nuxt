import * as Vue from 'vue'

/**
 * Create a component instance and mount it to the parent container.
 * @param {Vue.DefineComponent<T, T, any>} component Component.
 * @param {any} props Props.
 * @param {HTMLElement} parentContainer Parent container.
 * @param {string} node Node.
 * @param {object} slots Slots.
 * @returns {Vue.ComponentInternalInstance | null} Component instance.
 * @template T Props type.
 */
export function createComponent<T>(
  component: Vue.DefineComponent<T, T, any>,
  props: any,
  parentContainer: HTMLElement,
  node: string,
  slots = {},
) {
  const vNode = Vue.h(component, props, slots)
  const container = document.createElement('div')
  container.classList.add(node)
  parentContainer.appendChild(container)
  Vue.render(vNode, container)

  return vNode.component
}
