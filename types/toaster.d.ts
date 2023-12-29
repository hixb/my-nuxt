import type { ToastSpaceEnum } from '~/types/enum'
import type { SiteTypeKey } from '~/types/index'

namespace ToastSpace {
  /**
   * Toast type key.
   */
  type ToastTypeKey = keyof typeof ToastSpaceEnum.ToastType

  /**
   * Appear position.
   */
  type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom'

  /**
   * Toast props.
   */
  interface Prop {
    /**
     * Toast message.
     */
    message: string
    /**
     * Toast position.
     */
    position?: ToastSpace.Position
    /**
     * Toast type.
     */
    type?: ToastSpace.ToastTypeKey & SiteTypeKey
    /**
     * Toast duration.
     */
    duration?: number
    /**
     *
     * Toast title.
     */
    title?: string
  }

  /**
   * Toast instance.
   */
  interface ActiveToast {
    /**
     * Component dismiss.
     */
    dismiss(): void
  }
}
